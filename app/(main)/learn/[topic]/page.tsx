import Link from "next/link"
import { notFound } from "next/navigation"
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    CheckCircle2,
    Droplets,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { topicData } from "@/features/learning/topicData"




export function generateStaticParams() {
    return Object.keys(topicData).map((topic) => ({
        topic,
    }))
}

export default async function TopicPage({
    params,
}: {
    params: Promise<{ topic: string }>
}) {
    const { topic } = await params
    const data = topicData[topic]

    if (!data) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="bg-slate-950 text-white">
                <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
                    <Link
                        href="/learn"
                        className="inline-flex items-center text-sm text-slate-400 transition hover:text-white"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Learning Hub
                    </Link>

                    <div className="mt-14 max-w-3xl">
                        <Badge className="border border-sky-400/20 bg-sky-400/10 text-sky-300">
                            {data.level}
                        </Badge>

                        <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">
                            {data.title}
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-300">
                            {data.description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-6 py-14 lg:px-8">
                <div className="grid gap-5">
                    {data.sections.map((section, index) => (
                        <article
                            key={section.title}
                            className="rounded-3xl border bg-white p-7 shadow-sm md:p-9"
                        >
                            <div className="flex items-start gap-5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sm font-bold text-sky-600">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold">
                                        {section.title}
                                    </h2>

                                    <p className="mt-4 text-base leading-8 text-slate-600">
                                        {section.text}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-10 rounded-3xl border bg-sky-50 p-7">
                    <div className="flex gap-4">
                        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-sky-600" />

                        <div>
                            <h3 className="font-bold text-slate-900">
                                Key idea
                            </h3>

                            <p className="mt-2 leading-7 text-slate-600">
                                Understanding water helps us make better decisions about how
                                we use, protect and manage this essential resource.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-wrap justify-between gap-4">
                    <Button variant="outline" className="rounded-xl">
                        <Link className="flex flex-row" href="/learn">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            All topics
                        </Link>
                    </Button>

                    <Button className="rounded-xl bg-sky-500 hover:bg-sky-600" >
                        <Link className="flex flex-row " href="/ai">
                            Ask AquaMind
                            <Droplets className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    )
}