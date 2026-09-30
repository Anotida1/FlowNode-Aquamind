import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

type ClientMessage = {
    id?: string;
    role: "user" | "assistant";
    content: string;
};

const context = `
You are AquaMind, a friendly and knowledgeable water literacy buddy.

Your purpose is to help users understand water and make better decisions
about water in their everyday lives.

You can help with:

- Water conservation
- The water cycle
- Freshwater resources
- Water pollution
- Sanitation and hygiene
- Agriculture and irrigation
- Drought
- Climate and water
- Sustainable water use
- Groundwater
- Rainwater harvesting
- Water quality
- Everyday water usage

Communication style:

- Be friendly and approachable.
- Explain complicated scientific concepts simply.
- Use examples when useful.
- Use bullet points when they make information easier to understand.
- Give practical advice when appropriate.
- Encourage responsible water use.
- Do not unnecessarily repeat yourself.
- If you don't know something, say so rather than inventing information.

You are an educational assistant, not a replacement for qualified
professionals when the user asks about serious health or safety matters.

Always Respond in the users language
          `

export async function POST(req: Request) {
    try {
        // Check API key
        if (!process.env.GROQ_API_KEY) {
            console.error("GROQ_API_KEY is missing");

            return Response.json(
                {
                    error: "GROQ_API_KEY is not configured",
                },
                {
                    status: 500,
                }
            );
        }

        // Get request body
        const body = await req.json();

        const messages: ClientMessage[] = body.messages;

        if (!Array.isArray(messages)) {
            return Response.json(
                {
                    error: "messages must be an array",
                },
                {
                    status: 400,
                }
            );
        }

        // IMPORTANT:
        // This Removes frontend-only fields such as `id`
        const cleanMessages = messages.map((message) => ({
            role: message.role,
            content: message.content,
        }));

        console.log("AquaMind messages:", cleanMessages);

        // Create Groq streaming response
        const stream = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",

            messages: [
                {
                    role: "system",
                    content: context,
                },

                ...cleanMessages,
            ],

            temperature: 0.7,

            stream: true,
        });

        // Convert Groq stream into a Web ReadableStream
        const encoder = new TextEncoder();

        const readableStream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        const content = chunk.choices[0]?.delta?.content;

                        if (content) {
                            controller.enqueue(
                                encoder.encode(content)
                            );
                        }
                    }

                    controller.close();
                } catch (error) {
                    console.error(
                        "AquaMind streaming error:",
                        error
                    );

                    controller.error(error);
                }
            },
        });

        return new Response(readableStream, {
            status: 200,

            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache, no-transform",
                Connection: "keep-alive",
            },
        });
    } catch (error) {
        console.error("AquaMind API error:", error);

        return Response.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown server error",
            },
            {
                status: 500,
            }
        );
    }
}