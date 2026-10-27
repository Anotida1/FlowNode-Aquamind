type SoilAnalysisResult = {
    crop: string;
    description: string;
    suitability: number;
    category: "grain" | "vegetable" | "fruit" | "legume" | "root";
};