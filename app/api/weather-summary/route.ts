import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",

            messages: [
                {
                    role: "system",
                    content: `
You are AquaMind's weather AI assistant.

Analyze the weather information provided by the user.

Give a short and useful summary covering:
- Overall conditions
- Temperature
- Rain
- Wind
- UV
- Practical advice

Do not invent information.
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
            "Unable to generate a weather summary.";

        return NextResponse.json({
            message: response,
        });
    } catch (error) {
        console.error("GROQ ERROR:", error);

        return NextResponse.json(
            {
                error: error instanceof Error
                    ? error.message
                    : "Unknown Groq error",
            },
            { status: 500 }
        );
    }
}