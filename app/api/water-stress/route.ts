import { NextResponse } from "next/server"
import Groq from "groq-sdk"

import { waterStressSchema } from "@/lib/ai/water-stress-schema"

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

const context = `
You are AquaMind, an agricultural water-literacy assistant.

Your task is to analyze a crop image for visible signs
that may be associated with water stress.

Try to be more confident above 80% at least

IMPORTANT RULES:

1. Only make observations that can reasonably be supported
   by the image.

2. Do not claim that a crop definitely has water stress
   based only on appearance.

3. Visual symptoms can have multiple causes.

4. Do not invent soil moisture, temperature, rainfall,
   irrigation or sensor readings.

5. If sensor/environment information is unavailable,
   do not pretend that it exists.

6. Water stress score represents the estimated likelihood
   and severity of visible water-stress indicators,
   NOT a laboratory measurement.

7. Give practical, cautious agricultural advice.

8. If the crop cannot be confidently identified,
   describe it as "Unknown crop".

9. Keep explanations understandable to a farmer.

10. Return ONLY the required structured response.
                        `

export async function POST(request: Request) {
    try {
        const formData = await request.formData()

        const image = formData.get("image")

        if (!image || !(image instanceof File)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "An image is required.",
                },
                { status: 400 }
            )
        }

        // ---------------------------------------------
        // Validate image
        // ---------------------------------------------

        if (!image.type.startsWith("image/")) {
            return NextResponse.json(
                {
                    success: false,
                    error: "The uploaded file must be an image.",
                },
                { status: 400 }
            )
        }

        // ---------------------------------------------
        // Convert image to base64
        // ---------------------------------------------

        const buffer = Buffer.from(
            await image.arrayBuffer()
        )

        const base64Image = buffer.toString("base64")

        const imageUrl =
            `data:${image.type};base64,${base64Image}`

        // ---------------------------------------------
        // Ask Groq
        // ---------------------------------------------

        const completion =
            await groq.chat.completions.create({
                model: "qwen/qwen3.8-27b",

                temperature: 0,

                messages: [
                    {
                        role: "system",
                        content: context,
                    },

                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `
Analyze this crop image for possible signs
of water stress.

Look specifically for:

- leaf drooping
- wilting
- curling
- discoloration associated with possible stress
- reduced canopy appearance
- leaf posture
- visible environmental clues

Do not diagnose plant disease from appearance alone.
                        `,
                            },

                            {
                                type: "image_url",
                                image_url: {
                                    url: imageUrl,
                                },
                            },
                        ],
                    },
                ],

                response_format: {
                    type: "json_schema",

                    json_schema: {
                        name: "water_stress_analysis",

                        strict: true,

                        schema: waterStressSchema,
                    },
                },
            })

        // ---------------------------------------------
        // Get structured result
        // ---------------------------------------------

        const content =
            completion.choices[0]?.message?.content

        if (!content) {
            throw new Error(
                "Groq returned an empty response."
            )
        }

        const analysis = JSON.parse(content)

        // ---------------------------------------------
        // Final server response
        // ---------------------------------------------

        return NextResponse.json({
            success: true,

            data: {
                ...analysis,

                metadata: {
                    analyzedAt:
                        new Date().toISOString(),

                    imageName: image.name,

                    imageType: image.type,
                },
            },
        })
    } catch (error) {
        console.error(
            "Water stress analysis error:",
            error
        )

        return NextResponse.json(
            {
                success: false,
                error:
                    "Unable to analyze the crop image.",
            },
            { status: 500 }
        )
    }
}