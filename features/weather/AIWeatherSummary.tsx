"use client";

import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { Markdown } from "../ai/markdown/markdown";

type Props = {
    message: string;
};

export default function AIWeatherSummary({ message }: Props) {
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function generateSummary() {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/api/weather-summary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate summary");
            }

            const data = await response.json();

            setSummary(data.message);
        } catch (error) {
            console.error(error);
            setError("Couldn't generate the AI summary.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="mt-9 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-sm sm:p-7">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="grid size-9 place-items-center rounded-xl bg-[#17384a] text-white">
                            <Sparkles size={18} />
                        </div>

                        <div>
                            <span className="text-[11px] font-bold tracking-[1.5px] text-[#66818d]">
                                AI INSIGHT
                            </span>

                            <h2 className="font-[family-name:var(--font-space)] text-xl font-bold">
                                Weather Summary
                            </h2>
                        </div>
                    </div>
                </div>

                {summary && (
                    <button
                        onClick={generateSummary}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />
                    </button>
                )}
            </div>

            {!summary && !loading && (
                <div className="mt-6">
                    <p className="mb-4 text-sm leading-6 text-slate-500">
                        Get an AI-powered summary of today's weather and what it means
                        for you.
                    </p>

                    <button
                        onClick={generateSummary}
                        className="rounded-xl bg-[#17384a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#214b60]"
                    >
                        <span className="flex items-center gap-2">
                            <Sparkles size={16} />
                            Generate Summary
                        </span>
                    </button>
                </div>
            )}

            {loading && (
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#eff6f9] p-4">
                    <Sparkles size={18} className="animate-pulse text-[#17384a]" />

                    <div>
                        <p className="text-sm font-semibold text-slate-700">
                            Analyzing the weather...
                        </p>

                        <p className="text-xs text-slate-400">
                            AquaMind AI is preparing your summary
                        </p>
                    </div>
                </div>
            )}

            {error && (
                <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {summary && !loading && (
                <div className="mt-6 rounded-2xl bg-[#eff6f9] p-5">
                    <div className="flex gap-3">
                        <Sparkles
                            size={18}
                            className="mt-1 shrink-0 text-[#17384a]"
                        />
                        <Markdown content={summary} />
                    </div>
                </div>
            )}
        </section>
    );
}