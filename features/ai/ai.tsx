"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import {
    ArrowUp,
    Droplets,
    Leaf,
    Lightbulb,
    Loader2,
    Plus,
    Send,
    Sparkles,
    Waves,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { Markdown } from "./markdown/markdown";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

const suggestions = [
    {
        icon: Droplets,
        title: "Save water",
        prompt:
            "What are some simple ways I can save water at home?",
    },

    {
        icon: Leaf,
        title: "Water & farming",
        prompt:
            "How does water availability affect crop growth?",
    },

    {
        icon: Waves,
        title: "Water cycle",
        prompt:
            "Explain the water cycle in a simple way.",
    },

    {
        icon: Lightbulb,
        title: "Learn something",
        prompt:
            "Tell me an interesting fact about freshwater.",
    },
];

export default function AquaMindChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    const [isStreaming, setIsStreaming] =
        useState(false);

    const messagesEndRef =
        useRef<HTMLDivElement>(null);

    const textareaRef =
        useRef<HTMLTextAreaElement>(null);

    /*
     * Automatically scroll to the newest message
     */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    /*
     * Send message
     */
    const sendMessage = async (
        suggestedMessage?: string
    ) => {
        const text = (
            suggestedMessage ?? input
        ).trim();

        if (!text || isStreaming) {
            return;
        }

        setInput("");

        /*
         * Create user message
         */
        const userMessage: Message = {
            id: uuidv4(),
            role: "user",
            content: text,
        };

        /*
         * Create empty assistant message.
         *
         * We will fill this message as Groq streams
         * tokens back to us.
         */
        const assistantId = uuidv4();

        const assistantMessage: Message = {
            id: assistantId,
            role: "assistant",
            content: "",
        };

        /*
         * Save messages to UI immediately
         */
        setMessages((previous) => [
            ...previous,
            userMessage,
            assistantMessage,
        ]);

        setIsStreaming(true);

        try {
            /*
             * Send conversation to our Next.js API
             */
            const response = await fetch("/api/chat", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    messages: [
                        ...messages,
                        userMessage,
                    ],
                }),
            });

            /*
             * Handle HTTP errors
             */
            if (!response.ok) {
                const errorText =
                    await response.text();

                console.error(
                    "AquaMind API ERROR"
                );

                console.error(
                    "Status:",
                    response.status
                );

                console.error(
                    "Status text:",
                    response.statusText
                );

                console.error(
                    "Body:",
                    errorText
                );

                throw new Error(
                    errorText ||
                    `API request failed with status ${response.status}`
                );
            }

            /*
             * Make sure the server gave us a stream
             */
            if (!response.body) {
                throw new Error(
                    "The server returned no response body."
                );
            }

            /*
             * Get streaming reader
             */
            const reader =
                response.body.getReader();

            const decoder =
                new TextDecoder();

            let assistantText = "";

            /*
             * Read stream continuously
             */
            while (true) {
                const { value, done } =
                    await reader.read();

                if (done) {
                    break;
                }

                /*
                 * Convert bytes to text
                 */
                const chunk =
                    decoder.decode(value, {
                        stream: true,
                    });

                assistantText += chunk;

                /*
                 * Update only the assistant message
                 */
                setMessages((previous) =>
                    previous.map((message) =>
                        message.id === assistantId
                            ? {
                                ...message,
                                content:
                                    assistantText,
                            }
                            : message
                    )
                );
            }

            /*
             * Flush decoder
             */
            assistantText += decoder.decode();

            setMessages((previous) =>
                previous.map((message) =>
                    message.id === assistantId
                        ? {
                            ...message,
                            content: assistantText,
                        }
                        : message
                )
            );
        } catch (error) {
            console.error(
                "AquaMind chat error:",
                error
            );

            setMessages((previous) =>
                previous.map((message) =>
                    message.id === assistantId
                        ? {
                            ...message,
                            content:
                                "Sorry, I couldn't connect to AquaMind right now. Please try again.",
                        }
                        : message
                )
            );
        } finally {
            setIsStreaming(false);

            /*
             * Put cursor back in textarea
             */
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 50);
        }
    };

    /*
     * Enter = send
     * Shift + Enter = new line
     */
    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            sendMessage();
        }
    };

    return (
        <main className="relative flex h-[calc(100vh-7rem)] min-h-0 flex-1 flex-col overflow-hidden bg-background">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

                <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
            </div>

            <div className=" relative flex min-h-0 flex-1 flex-col">
                {messages.length === 0 ? (
                    /*
                     * ==============================
                     * WELCOME SCREEN
                     * ==============================
                     */
                    <div className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-0">
                        <div className="w-full max-w-3xl">
                            {/* Logo */}
                            <div className="md:mt-0 mb-8 flex flex-col items-center text-center">
                                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 ring-1 ring-cyan-500/20">
                                    <Droplets className="h-8 w-8 text-cyan-500" />
                                </div>

                                <div className="mb-2 flex items-center gap-2">
                                    <h1 className="text-3xl font-semibold tracking-tight">
                                        How can I help with water?
                                    </h1>

                                    <Sparkles className="h-5 w-5 text-cyan-500" />
                                </div>

                                <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                                    I'm AquaMind, your water
                                    literacy buddy. Ask me about
                                    water conservation, agriculture,
                                    sanitation, climate, the water
                                    cycle, and more.
                                </p>
                            </div>


                        </div>
                    </div>
                ) : (
                    /*
                     * ==============================
                     * CHAT
                     * ==============================
                     */
                    <div className="flex-1 overflow-y-auto">
                        <div className="mx-auto w-full max-w-3xl px-4 py-8">
                            <div className="space-y-8">
                                {messages.map(
                                    (message) => {
                                        const isUser =
                                            message.role ===
                                            "user";

                                        return (
                                            <div
                                                key={message.id}
                                                className={cn(
                                                    "flex gap-3",
                                                    isUser &&
                                                    "justify-end"
                                                )}
                                            >
                                                {!isUser && (
                                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                                                        <Droplets className="h-4 w-4 text-cyan-500" />
                                                    </div>
                                                )}

                                                <div
                                                    className={cn(
                                                        "max-w-[85%]",
                                                        isUser &&
                                                        "flex flex-col items-end"
                                                    )}
                                                >
                                                    <div
                                                        className={cn(
                                                            "rounded-2xl px-4 py-3 text-sm leading-7",
                                                            isUser
                                                                ? "rounded-br-md bg-cyan-600 text-white"
                                                                : "rounded-bl-md border bg-card"
                                                        )}
                                                    >
                                                        {message.content ? (
                                                            <div className="whitespace-pre-wrap">
                                                                {
                                                                    <Markdown content={message.content} />
                                                                }
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1.5 py-1">
                                                                <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.3s]" />

                                                                <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.15s]" />

                                                                <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-500" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {!isUser &&
                                                        message.content && (
                                                            <div className="mt-2 flex items-center gap-1.5 px-1 text-[11px] text-muted-foreground">
                                                                <Droplets className="h-3 w-3" />
                                                                AquaMind
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}

                                <div
                                    ref={messagesEndRef}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* ==============================
            COMPOSER
        ============================== */}
                <div className="relative shrink-0 px-4 pb-5 pt-3">
                    <div className="mx-auto w-full max-w-3xl">
                        <div className="relative rounded-2xl border bg-card shadow-sm transition-all focus-within:border-cyan-500/40 focus-within:ring-2 focus-within:ring-cyan-500/10">
                            <Textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(event) =>
                                    setInput(
                                        event.target.value
                                    )
                                }
                                onKeyDown={handleKeyDown}
                                disabled={isStreaming}
                                placeholder="Ask AquaMind about water..."
                                className="min-h-[58px] resize-none border-0 bg-transparent px-4 pb-12 pt-4 text-sm shadow-none focus-visible:ring-0"
                            />

                            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                                        disabled={isStreaming}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>

                                    <span className="hidden text-[11px] text-muted-foreground sm:block">
                                        Shift + Enter for a new
                                        line
                                    </span>
                                </div>

                                <Button
                                    size="icon"
                                    disabled={
                                        !input.trim() ||
                                        isStreaming
                                    }
                                    onClick={() =>
                                        sendMessage()
                                    }
                                    className="h-9 w-9 rounded-xl bg-cyan-600 hover:bg-cyan-700"
                                >
                                    {isStreaming ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                            <Sparkles className="h-3 w-3" />

                            AquaMind can make mistakes.
                            Verify important information.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}