import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        if (!message || typeof message !== "string") {
            return NextResponse.json(
                { error: "Water data is required" },
                { status: 400 }
            );
        }

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",

            messages: [
                {
                    role: "system",
                    content: `
You are AquaMind's AI Water Advisor.

Analyze the water data provided by the user and give
a short, practical, and useful water management summary.

Your response should cover:
- Current water availability and tank levels
- Water consumption and usage trends
- Possible water wastage or leaks, when supported by the data
- Water conservation recommendations
- Important warnings if necessary

Rules:
- Use only the information provided by the user.
- Never invent measurements, trends, or sensor readings.
- Do not claim there is a leak without sufficient evidence.
- If information is missing, acknowledge the limitation.
- Give clear, actionable advice.
- Keep the response concise and easy to understand.
- Do not repeat the entire input.
                    `,
                },
                {
                    role: "user",
                    content: message,
                },
            ],

            temperature: 0.5,
        });

        const response =
            completion.choices[0]?.message?.content ??
            "Unable to generate a water advice summary.";

        return NextResponse.json({
            message: response,
        });
    } catch (error) {
        console.error("GROQ WATER ADVISOR ERROR:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown Groq error",
            },
            { status: 500 }
        );
    }
}