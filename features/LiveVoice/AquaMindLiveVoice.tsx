"use client";

import { LiveVoiceContext } from "@/features/LiveVoice/context";
import { GoogleGenAI, Modality } from "@google/genai";
import {
    Activity,
    AudioLines,
    Droplets,
    Mic,
    MicOff,
    PhoneOff,
    Waves,
} from "lucide-react";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

type ConnectionStatus =
    | "idle"
    | "connecting"
    | "listening"
    | "speaking"
    | "error";

type Transcript = {
    id: number;
    role: "user" | "assistant";
    text: string;
};

type TokenResponse = {
    token?: string;
    error?: string;
};

const MODEL = "gemini-3.8-live";

const SYSTEM_INSTRUCTION = LiveVoiceContext

const WORKLET_SOURCE = `
class AquaMindMicProcessor extends AudioWorkletProcessor {
  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];

    // Keep the output silent to avoid audio feedback.
    if (output) {
      for (const channel of output) channel.fill(0);
    }

    if (input && input[0] && input[0].length > 0) {
      this.port.postMessage(input[0].slice());
    }

    return true;
  }
}

registerProcessor("aquamind-mic-processor", AquaMindMicProcessor);
`;

function encodePcm16(
    samples: Float32Array,
    sourceSampleRate: number,
): string {
    const targetSampleRate = 16000;
    const ratio = sourceSampleRate / targetSampleRate;
    const outputLength = Math.floor(samples.length / ratio);
    const pcm = new Int16Array(outputLength);

    for (let i = 0; i < outputLength; i++) {
        const position = i * ratio;
        const left = Math.floor(position);
        const right = Math.min(left + 1, samples.length - 1);
        const fraction = position - left;

        const sample =
            samples[left] * (1 - fraction) +
            samples[right] * fraction;

        const clamped = Math.max(-1, Math.min(1, sample));

        pcm[i] = clamped < 0
            ? clamped * 32768
            : clamped * 32767;
    }

    const bytes = new Uint8Array(pcm.buffer);
    let binary = "";

    for (let i = 0; i < bytes.length; i += 8192) {
        binary += String.fromCharCode(
            ...bytes.subarray(i, i + 8192),
        );
    }

    return btoa(binary);
}

function decodeBase64(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
}

function decodePcmAudio(
    context: AudioContext,
    base64: string,
): AudioBuffer {
    const bytes = decodeBase64(base64);
    const sampleCount = Math.floor(bytes.byteLength / 2);
    const view = new DataView(
        bytes.buffer,
        bytes.byteOffset,
        bytes.byteLength,
    );

    const audioBuffer = context.createBuffer(
        1,
        sampleCount,
        24000,
    );

    const channel = audioBuffer.getChannelData(0);

    for (let i = 0; i < sampleCount; i++) {
        channel[i] = view.getInt16(i * 2, true) / 32768;
    }

    return audioBuffer;
}

export default function AquaMindVoiceAssistant() {
    const [status, setStatus] = useState<ConnectionStatus>("idle");
    const [transcripts, setTranscripts] = useState<Transcript[]>([]);
    const [muted, setMuted] = useState(false);
    const [error, setError] = useState("");

    const statusRef = useRef<ConnectionStatus>("idle");
    const mutedRef = useRef(false);
    const closingRef = useRef(false);
    const mountedRef = useRef(false);
    const nextIdRef = useRef(0);

    const sessionRef = useRef<
        Awaited<ReturnType<GoogleGenAI["live"]["connect"]>> | null
    >(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const workletRef = useRef<AudioWorkletNode | null>(null);
    const workletUrlRef = useRef<string | null>(null);

    const playbackRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const nextPlaybackTimeRef = useRef(0);

    const updateStatus = useCallback((next: ConnectionStatus) => {
        statusRef.current = next;

        if (mountedRef.current) {
            setStatus(next);
        }
    }, []);

    const addTranscript = useCallback(
        (role: Transcript["role"], text: string) => {
            const value = text.trim();

            if (!value || !mountedRef.current) return;

            setTranscripts((previous) => [
                ...previous,
                {
                    id: ++nextIdRef.current,
                    role,
                    text: value,
                },
            ]);
        },
        [],
    );

    const stopPlayback = useCallback(() => {
        for (const source of playbackRef.current) {
            try {
                source.stop();
            } catch {
                // The source may already have finished.
            }
        }

        playbackRef.current.clear();
        nextPlaybackTimeRef.current = 0;
    }, []);

    const cleanup = useCallback(async () => {
        closingRef.current = true;

        const session = sessionRef.current;
        sessionRef.current = null;

        if (session) {
            try {
                session.close();
            } catch {
                // The connection may already be closed.
            }
        }

        if (workletRef.current) {
            workletRef.current.port.onmessage = null;
            workletRef.current.disconnect();
            workletRef.current = null;
        }

        sourceRef.current?.disconnect();
        sourceRef.current = null;

        streamRef.current?.getTracks().forEach((track) => track.stop());
        streamRef.current = null;

        stopPlayback();

        const context = audioContextRef.current;
        audioContextRef.current = null;

        if (context && context.state !== "closed") {
            await context.close().catch(() => undefined);
        }

        if (workletUrlRef.current) {
            URL.revokeObjectURL(workletUrlRef.current);
            workletUrlRef.current = null;
        }

        mutedRef.current = false;

        if (mountedRef.current) {
            setMuted(false);
        }
    }, [stopPlayback]);

    const endConversation = useCallback(async () => {
        await cleanup();
        updateStatus("idle");
        setError("");
    }, [cleanup, updateStatus]);

    const startConversation = useCallback(async () => {
        if (
            statusRef.current === "connecting" ||
            statusRef.current === "listening" ||
            statusRef.current === "speaking"
        ) {
            return;
        }

        await cleanup();

        closingRef.current = false;
        setError("");
        setTranscripts([]);
        updateStatus("connecting");

        try {
            if (
                !navigator.mediaDevices ||
                !navigator.mediaDevices.getUserMedia
            ) {
                throw new Error(
                    "Microphone access requires HTTPS or localhost.",
                );
            }

            // Request a single-use, short-lived token from Next.js.
            const response = await fetch("/api/gemini-token", {
                method: "POST",
                cache: "no-store",
            });

            const payload: TokenResponse = await response.json();

            if (!response.ok || !payload.token) {
                throw new Error(
                    payload.error ?? "Unable to obtain a Gemini session token.",
                );
            }

            // Initialize the audio context and worklet.
            const context = new AudioContext();
            audioContextRef.current = context;

            const workletBlob = new Blob([WORKLET_SOURCE], {
                type: "text/javascript",
            });

            const workletUrl = URL.createObjectURL(workletBlob);
            workletUrlRef.current = workletUrl;

            await context.audioWorklet.addModule(workletUrl);
            await context.resume();

            // Request microphone permission after the user clicks Start.
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                },
            });

            streamRef.current = stream;

            if (closingRef.current) {
                stream.getTracks().forEach((track) => track.stop());
                return;
            }

            const ai = new GoogleGenAI({
                apiKey: payload.token,
                httpOptions: { apiVersion: "v1beta" },
            });

            const session = await ai.live.connect({
                model: MODEL,
                config: {
                    responseModalities: [Modality.AUDIO],
                    systemInstruction: SYSTEM_INSTRUCTION,
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: {
                                voiceName: "Kore",
                            },
                        },
                    },
                },
                callbacks: {
                    onmessage: (message) => {
                        if (closingRef.current) return;

                        const content = message.serverContent;
                        if (!content) return;

                        if (content.interrupted) {
                            stopPlayback();
                        }

                        if (content.inputTranscription?.text) {
                            addTranscript("user", content.inputTranscription.text);
                        }

                        if (content.outputTranscription?.text) {
                            addTranscript(
                                "assistant",
                                content.outputTranscription.text,
                            );
                        }

                        const audioContext = audioContextRef.current;
                        let hasAudio = false;

                        if (audioContext && audioContext.state !== "closed") {
                            for (const part of content.modelTurn?.parts ?? []) {
                                const inlineData = part.inlineData;

                                if (
                                    !inlineData?.data ||
                                    !inlineData.mimeType?.startsWith("audio/pcm")
                                ) {
                                    continue;
                                }

                                const buffer = decodePcmAudio(
                                    audioContext,
                                    inlineData.data,
                                );

                                const source = audioContext.createBufferSource();
                                source.buffer = buffer;
                                source.connect(audioContext.destination);

                                const startAt = Math.max(
                                    audioContext.currentTime,
                                    nextPlaybackTimeRef.current,
                                );

                                source.start(startAt);
                                nextPlaybackTimeRef.current = startAt + buffer.duration;

                                playbackRef.current.add(source);

                                source.onended = () => {
                                    playbackRef.current.delete(source);

                                    if (
                                        playbackRef.current.size === 0 &&
                                        !closingRef.current &&
                                        statusRef.current !== "error"
                                    ) {
                                        updateStatus("listening");
                                    }
                                };

                                hasAudio = true;
                            }
                        }

                        if (hasAudio) {
                            updateStatus("speaking");
                        } else if (content.turnComplete) {
                            updateStatus("listening");
                        }
                    },

                    onerror: (event) => {
                        console.error("Gemini Live error:", event.message);

                        if (!closingRef.current) {
                            setError(
                                event.message || "The voice connection encountered an error.",
                            );
                            updateStatus("error");
                        }
                    },

                    onclose: () => {
                        if (!closingRef.current) {
                            setError("The Gemini Live connection was closed.");
                            updateStatus("error");
                            void cleanup();
                        }
                    },
                },
            });

            if (closingRef.current) {
                session.close();
                return;
            }

            sessionRef.current = session;

            const microphoneSource = context.createMediaStreamSource(stream);
            sourceRef.current = microphoneSource;

            const worklet = new AudioWorkletNode(
                context,
                "aquamind-mic-processor",
            );

            workletRef.current = worklet;

            worklet.port.onmessage = (
                event: MessageEvent<Float32Array>,
            ) => {
                const activeSession = sessionRef.current;

                if (
                    !activeSession ||
                    mutedRef.current ||
                    closingRef.current
                ) {
                    return;
                }

                const audioData = encodePcm16(
                    event.data,
                    context.sampleRate,
                );

                try {
                    activeSession.sendRealtimeInput({
                        audio: {
                            data: audioData,
                            mimeType: "audio/pcm;rate=16000",
                        },
                    });
                } catch (sendError) {
                    console.error("Microphone streaming error:", sendError);
                }
            };

            microphoneSource.connect(worklet);

            // The worklet's output is silent.
            worklet.connect(context.destination);

            updateStatus("listening");
        } catch (cause: unknown) {
            console.error("Unable to start AquaMind:", cause);

            const message =
                cause instanceof Error
                    ? cause.message
                    : "An unexpected error occurred while starting voice chat.";

            await cleanup();
            setError(message);
            updateStatus("error");
        }
    }, [
        addTranscript,
        cleanup,
        stopPlayback,
        updateStatus,
    ]);

    const toggleMute = useCallback(() => {
        const next = !mutedRef.current;
        mutedRef.current = next;
        setMuted(next);
    }, []);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
            void cleanup();
        };
    }, [cleanup]);

    const active =
        status === "listening" || status === "speaking";

    const statusText: Record<ConnectionStatus, string> = {
        idle: "Ready when you are",
        connecting: "Connecting to AquaMind...",
        listening: muted ? "Microphone paused" : "Listening to you",
        speaking: "AquaMind is speaking",
        error: "Connection issue",
    };

    return (
        <main className="relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-background text-foreground">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
                <div className="absolute bottom-[-160px] right-[-80px] h-[360px] w-[360px] rounded-full bg-primary/10 blur-[100px]" />
            </div>

            <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-8 md:px-8">
                <div className="mb-5 text-center">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground">
                        <Waves className="h-3.5 w-3.5 text-primary" />
                        REAL-TIME VOICE ASSISTANT
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        How can I help with
                        <span className="text-primary"> water?</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                        Ask a question, explore an idea, or learn how to protect
                        our most valuable resource.
                    </p>
                </div>

                <div className="flex min-h-[230px] flex-col items-center justify-center py-4">
                    <div className="relative flex h-48 w-48 items-center justify-center">

                        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-primary/10 bg-primary/20  transition-transform duration-500">
                            {status === "connecting" ? (
                                <Activity className="h-10 w-10 animate-pulse text-primary" />
                            ) : status === "speaking" ? (
                                <AudioLines className="h-11 w-11 animate-pulse text-primary " />
                            ) : status === "error" ? (
                                <MicOff className="h-10 w-10 text-red-500" />
                            ) : (
                                <Droplets className="h-12 w-12 text-primary" />
                            )}
                        </div>
                    </div>

                    <p className="mt-3 text-sm font-medium">{statusText[status]}</p>

                    <p className="mt-1 text-center text-xs text-muted-foreground">
                        {status === "idle"
                            ? "Tap the microphone to start"
                            : status === "connecting"
                                ? "Preparing your voice session"
                                : status === "speaking"
                                    ? "Speak to interrupt AquaMind"
                                    : status === "error"
                                        ? "Check your connection and try again"
                                        : muted
                                            ? "Unmute your microphone to speak"
                                            : "Speak naturally — I'm listening"}
                    </p>
                </div>

                {error && (
                    <div
                        role="alert"
                        className="mx-auto mb-5 w-full max-w-2xl rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm"
                    >
                        <p className="font-medium text-red-600">
                            Unable to continue voice chat
                        </p>
                        <p className="mt-1 text-muted-foreground">{error}</p>
                    </div>
                )}

                <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
                    {active ? (
                        <>
                            <button
                                type="button"
                                onClick={toggleMute}
                                aria-pressed={muted}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border bg-background px-5 text-sm font-medium transition hover:bg-muted"
                            >
                                {muted ? (
                                    <MicOff className="h-4 w-4" />
                                ) : (
                                    <Mic className="h-4 w-4" />
                                )}
                                {muted ? "Unmute" : "Mute"}
                            </button>

                            <button
                                type="button"
                                onClick={() => void endConversation()}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red-500 px-6 text-sm font-medium text-white transition hover:bg-red-600"
                            >
                                <PhoneOff className="h-4 w-4" />
                                End conversation
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => void startConversation()}
                            disabled={status === "connecting"}
                            className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Mic className="h-5 w-5" />
                            {status === "connecting"
                                ? "Connecting..."
                                : status === "error"
                                    ? "Try again"
                                    : "Start talking"}
                        </button>
                    )}
                </div>

                <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-hidden rounded-2xl border bg-card/70 backdrop-blur-sm">
                    <div className="flex items-center justify-between border-b px-5 py-4">
                        <div>
                            <h3 className="text-sm font-semibold">Conversation</h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Speech transcriptions
                            </p>
                        </div>
                        <AudioLines className="h-5 w-5 text-primary" />
                    </div>

                    <div
                        aria-live="polite"
                        className="max-h-[340px] min-h-[140px] flex-1 space-y-5 overflow-y-auto p-5"
                    >
                        {transcripts.length === 0 ? (
                            <div className="flex h-full min-h-[120px] flex-col items-center justify-center text-center">
                                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                                    <Waves className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-medium">
                                    Your conversation starts here
                                </p>
                                <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
                                    Your words and AquaMind&apos;s responses will appear here.
                                </p>
                            </div>
                        ) : (
                            transcripts.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <div
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${item.role === "assistant"
                                            ? "bg-primary/10 text-primary"
                                            : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {item.role === "assistant" ? (
                                            <Droplets className="h-4 w-4" />
                                        ) : (
                                            <Mic className="h-4 w-4" />
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="mb-1 text-xs font-semibold">
                                            {item.role === "assistant" ? "AquaMind" : "You"}
                                        </p>
                                        <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex items-center gap-2 border-t px-5 py-3 text-xs text-muted-foreground">
                        <Activity className="h-3.5 w-3.5 text-primary" />
                        {active
                            ? "Live session · Audio powered AquaMind"
                            : "Start talking to begin"}
                    </div>
                </section>

                <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
                    AquaMind can make mistakes. Verify important information.
                    Microphone permission is required for voice conversations.
                </p>
            </section>
        </main>
    );
}
