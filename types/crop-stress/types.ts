
export type WaterStressResult = {
    stressScore: number
    stressLevel:
    | "No significant stress"
    | "Mild stress"
    | "Moderate stress"
    | "Severe stress"
    confidence: number
    crop: string
    visualSigns: string[]

    advice: {
        summary: string
        recommendation: string
    }

    evidence: {
        type:
        | "crop_appearance"
        | "soil_moisture"
        | "environment"
        title: string
        description: string
    }[]

    metadata: {
        analyzedAt: string
        imageName: string
        imageType: string
    }
}