
"use client";

import { useState } from "react";
import {
    Droplets,
    FlaskConical,
    Leaf,
    RotateCcw,
    Sparkles,
    Waves,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

import SoilAnalysisResults from "./result";
import GetSoilAnalysis from "@/lib/api/Soil Analysis/SoilAnalysis";
import AquaMindLoader from "@/components/Ai/AquaMindLoader";

export default function SoilAnalysisPage() {
    const [soilMoisture, setSoilMoisture] = useState("");
    const [soilTemperature, setSoilTemperature] = useState("");
    const [soilPH, setSoilPH] = useState("");
    const [soilNitrogen, setNitrogen] = useState("");
    const [soilPhosphorous, setPhosphorus] = useState("");
    const [soilPotassium, setPotassium] = useState("");
    const [waterAvailability, setWaterAvailability] = useState("");

    const [result, setResult] = useState<SoilAnalysisResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleAnalyse() {
        setError("");

        const fields = [
            soilMoisture,
            soilTemperature,
            soilPH,
            soilNitrogen,
            soilPhosphorous,
            soilPotassium,
            waterAvailability,
        ];

        const values = fields.map(Number);

        if (values.some((value) => !Number.isFinite(value))) {
            setError("Please enter valid numbers for all measurements.");
            return;
        }

        if (
            values.some((value) => value < 0) ||
            Number(soilMoisture) > 100 ||
            Number(waterAvailability) > 100 ||
            Number(soilPH) > 14
        ) {
            setError(
                "Check your measurements. Moisture and water availability must be 0–100%, and pH must be 0–14."
            );
            return;
        }

        setIsLoading(true);
        setResult([]);

        try {
            const info: SoilAnalysisResult[] = await GetSoilAnalysis({
                soilMoisture,
                soilTemperature,
                soilPH,
                soilNitrogen,
                soilPhosphorous,
                soilPotassium,
                waterAvailability,
            });

            if (!Array.isArray(info)) {
                throw new Error("The AI returned an unexpected response.");
            }

            setResult(info);
        } catch (err) {
            console.error(err);
            setError(
                "We couldn't analyze your soil right now. Please check your connection and try again."
            );
        } finally {
            setIsLoading(false);
        }
    }

    function resetAnalysis() {
        setSoilMoisture("");
        setSoilTemperature("");
        setSoilPH("");
        setNitrogen("");
        setPhosphorus("");
        setPotassium("");
        setWaterAvailability("");
        setResult([]);
        setError("");
    }

    const measurements = [
        {
            label: "Soil Moisture",
            unit: "%",
            value: soilMoisture,
            setValue: setSoilMoisture,
            placeholder: "e.g. 45",
            min: 0,
            max: 100,
        },
        {
            label: "Soil Temperature",
            unit: "°C",
            value: soilTemperature,
            setValue: setSoilTemperature,
            placeholder: "e.g. 25",
        },
        {
            label: "Soil pH",
            unit: "pH",
            value: soilPH,
            setValue: setSoilPH,
            placeholder: "e.g. 6.5",
            min: 0,
            max: 14,
        },
        {
            label: "Nitrogen",
            unit: "mg/kg",
            value: soilNitrogen,
            setValue: setNitrogen,
            placeholder: "e.g. 40",
        },
        {
            label: "Phosphorus",
            unit: "mg/kg",
            value: soilPhosphorous,
            setValue: setPhosphorus,
            placeholder: "e.g. 25",
        },
        {
            label: "Potassium",
            unit: "mg/kg",
            value: soilPotassium,
            setValue: setPotassium,
            placeholder: "e.g. 150",
        },
        {
            label: "Water Availability",
            unit: "%",
            value: waterAvailability,
            setValue: setWaterAvailability,
            placeholder: "e.g. 60",
            min: 0,
            max: 100,
        },
    ];

    return (
        <ScrollArea className="h-full w-full">
            <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600">
                            <Droplets className="h-7 w-7" />
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold tracking-tight">
                                    AquaMind
                                </h1>
                                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300">
                                    AI Powered
                                </span>
                            </div>

                            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                                Understand your soil, evaluate water conditions, and discover
                                crops suited to your land.
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={resetAnalysis}
                        disabled={isLoading}
                        className="w-fit"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                </div>

                {/* Form */}
                <Card className="overflow-hidden">
                    <CardHeader className="border-b">
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-600">
                                <FlaskConical className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle>Soil Sample Information</CardTitle>
                                <CardDescription className="mt-1">
                                    Enter your measured soil values to get crop recommendations.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-5 p-5 md:p-6">
                        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                            {measurements.map((measurement) => (
                                <div key={measurement.label} className="space-y-2">
                                    <Label htmlFor={measurement.label}>
                                        {measurement.label}
                                    </Label>

                                    <div className="relative">
                                        <Input
                                            id={measurement.label}
                                            type="number"
                                            inputMode="decimal"
                                            min={measurement.min}
                                            max={measurement.max}
                                            step="any"
                                            placeholder={measurement.placeholder}
                                            value={measurement.value}
                                            onChange={(e) => measurement.setValue(e.target.value)}
                                            disabled={isLoading}
                                            className="pr-16"
                                        />
                                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
                                            {measurement.unit}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-muted-foreground">
                                <Waves className="mr-1 inline h-4 w-4 text-cyan-600" />
                                Use actual measurements where possible.
                            </p>

                            <Button
                                onClick={handleAnalyse}
                                disabled={isLoading}
                                className="bg-cyan-600 text-white hover:bg-cyan-700"
                            >
                                <Sparkles className="mr-2 h-4 w-4" />
                                {isLoading ? "Analyzing soil..." : "Analyze with AquaMind"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* AI loading */}
                {isLoading && <AquaMindLoader />}

                {/* Results */}
                {!isLoading && result.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Leaf className="h-5 w-5 text-cyan-600" />
                            <h2 className="text-xl font-semibold">Your Crop Recommendations</h2>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Explore the crops suggested by AquaMind based on your submitted
                            soil measurements.
                        </p>

                        <SoilAnalysisResults result={result} />
                    </div>
                )}
            </div>
        </ScrollArea>
    );
}
