
import { GoogleGenAI, Modality } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MODEL = "gemini-3.8-live";

export async function POST() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured." },
                { status: 500 },
            );
        }

        const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
                apiVersion: "v1beta",
            },
        });

        const token = await ai.authTokens.create({
            config: {
                uses: 1,

                // Token expires after 30 minutes.
                expireTime: new Date(
                    Date.now() + 30 * 60 * 1000,
                ).toISOString(),

                // The client must establish its session within 1 minute.
                newSessionExpireTime: new Date(
                    Date.now() + 60 * 1000,
                ).toISOString(),

                // Restrict the ephemeral token to this Live API model
                // and audio response configuration.
                liveConnectConstraints: {
                    model: MODEL,
                    config: {
                        responseModalities: [Modality.AUDIO],
                    },
                },
            },
        });

        if (!token.name) {
            throw new Error(
                "Gemini did not return an ephemeral token.",
            );
        }

        return NextResponse.json(
            { token: token.name },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store",
                },
            },
        );
    } catch (error: unknown) {
        console.error("Gemini token error:", error);

        return NextResponse.json(
            { error: "Unable to initialize Gemini Live." },
            { status: 500 },
        );
    }
}
