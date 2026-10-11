"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Markdown } from "../ai/markdown/markdown";

export default function AiOverview() {
    const [advice, setAdvice] = useState(
        "Generate a report to receive personalized water management advice."
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Example data: replace these values with your real water data.
    const waterData = {
        tankLevel: 72,
        todayUsageLitres: 489,
        yesterdayUsageLitres: 450,
        waterSavedLitres: 620,
        pumpRuntimeHours: 18.4,
    };

    async function generateAdvice() {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/water-advisor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: JSON.stringify(waterData),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to generate water advice."
                );
            }

            setAdvice(data.message);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full col-span-2">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary/10 p-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                    </div>

                    <div>
                        <CardTitle className="text-base">
                            AI Water Advisor
                        </CardTitle>

                        <p className="text-xs text-muted-foreground">
                            Based on your current water data
                        </p>
                    </div>
                </div>

                <Button
                    onClick={generateAdvice}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate"}
                </Button>
            </CardHeader>

            <CardContent>
                <div className="rounded-lg bg-muted/50 p-4">
                    {loading ? (
                        <p className="text-sm text-muted-foreground">
                            Analyzing your water data...
                        </p>
                    ) : error ? (
                        <p className="text-sm text-destructive">
                            {error}
                        </p>
                    ) : (
                        <Markdown content={advice} />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}