export default async function GetSoilAnalysis(info: any) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_AI_BACKEND_URL}/soilAnalysis`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to analyze soil");
    }

    return response.json();
}