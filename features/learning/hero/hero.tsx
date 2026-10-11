import Link from "next/link"
import { ArrowRight, Droplets, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export default function LearningHero() {
    return (
        <>
            {/* HERO */}
            <section className="relative overflow-hidden bg-slate-950 w-full min-w-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.22),transparent_35%),radial-gradient(circle_at_20%_100%,rgba(20,184,166,0.16),transparent_35%)]" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
                        <div>
                            <Badge className="mb-6 border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-sky-300 hover:bg-sky-400/10">
                                <Droplets className="mr-2 h-3.5 w-3.5" />
                                AQUAMIND LEARNING HUB
                            </Badge>

                            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                                Understand water.
                                <span className="block text-sky-400">
                                    Understand our future.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                                Explore the science, importance and everyday impact of water
                                through simple and engaging learning.
                            </p>

                            <div className="mt-9 flex flex-wrap gap-3">
                                <Link
                                    className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-700 bg-white/5 px-6 text-sm text-white transition-colors hover:bg-white/10"
                                    href="#topics"
                                >
                                    Explore topics
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>

                                <Link
                                    className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-700 bg-white/5 px-6 text-sm text-white transition-colors hover:bg-white/10"
                                    href="/ai"
                                >
                                    Ask AquaMind
                                    <Sparkles className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {/* WATER VISUAL */}
                        <div className="relative mx-auto flex h-[360px] w-full max-w-md items-center justify-center">

                            <div className="relative flex h-44 w-44 rotate-45 items-center justify-center rounded-full bg-gradient-to-br from-sky-300 via-sky-500 to-cyan-700 shadow-[0_0_100px_rgba(14,165,233,0.35)]">
                                <Droplets className="h-20 w-20 -rotate-45 text-white/80" />
                            </div>

                            <div className="absolute left-8 top-12 h-3 w-3 rounded-full bg-sky-300" />
                            <div className="absolute right-10 top-24 h-2 w-2 rounded-full bg-cyan-300" />
                            <div className="absolute bottom-16 left-20 h-2 w-2 rounded-full bg-sky-400" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}