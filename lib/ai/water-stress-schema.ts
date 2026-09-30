export const waterStressSchema = {
    type: "object",
    properties: {
        stressScore: {
            type: "number",
            description:
                "Estimated water stress percentage from 0 to 100.",
        },

        stressLevel: {
            type: "string",
            enum: [
                "No significant stress",
                "Mild stress",
                "Moderate stress",
                "Severe stress",
            ],
        },

        confidence: {
            type: "number",
            minimum: 0,
            maximum: 1,
            description:
                "Confidence in the visual assessment as a decimal between 0 and 1. For example, 0.85 means 85% confidence.",
        },

        crop: {
            type: "string",
            description:
                "The crop identified or most likely represented in the image.",
        },

        visualSigns: {
            type: "array",
            items: {
                type: "string",
            },
            description:
                "Visible signs relevant to possible water stress.",
        },

        advice: {
            type: "object",
            properties: {
                summary: {
                    type: "string",
                },

                recommendation: {
                    type: "string",
                },
            },
            required: [
                "summary",
                "recommendation",
            ],
            additionalProperties: false,
        },

        evidence: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        enum: [
                            "crop_appearance",
                            "soil_moisture",
                            "environment",
                        ],
                    },

                    title: {
                        type: "string",
                    },

                    description: {
                        type: "string",
                    },
                },
                required: [
                    "type",
                    "title",
                    "description",
                ],
                additionalProperties: false,
            },
        },
    },

    required: [
        "stressScore",
        "stressLevel",
        "confidence",
        "crop",
        "visualSigns",
        "advice",
        "evidence",
    ],

    additionalProperties: false,
}