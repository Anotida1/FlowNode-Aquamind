"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
    ArrowRight,
    BookOpen,
    ChevronRight,
    CloudRain,
    CloudSun,
    Droplets,
    FlaskConical,
    Leaf,
    Mountain,
    Search,
    ShieldCheck,
    Sparkles,
    Sprout,
    Waves,
    Wind,
    X,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const topics = [
    {
        slug: "water-basics",
        title: "Water Basics",
        description:
            "Understand why water is essential and how Earth's water is distributed.",
        icon: Droplets,
        level: "Beginner",
        lessons: ["Why water matters", "Freshwater vs saltwater", "Earth's water"],
    },
    {
        slug: "water-cycle",
        title: "The Water Cycle",
        description:
            "Discover how water continuously moves through Earth's systems.",
        icon: CloudRain,
        level: "Beginner",
        lessons: [
            "Evaporation",
            "Condensation",
            "Precipitation",
            "Infiltration",
        ],
    },
    {
        slug: "groundwater",
        title: "Groundwater",
        description:
            "Explore the hidden water beneath our feet and how aquifers work.",
        icon: Waves,
        level: "Intermediate",
        lessons: ["Aquifers", "Water tables", "Wells", "Groundwater recharge"],
    },
    {
        slug: "rivers-watersheds",
        title: "Rivers & Watersheds",
        description:
            "Understand how water flows across landscapes and connects ecosystems.",
        icon: Mountain,
        level: "Intermediate",
        lessons: ["Rivers", "Runoff", "Watersheds", "Drainage basins"],
    },
    {
        slug: "water-conservation",
        title: "Water Conservation",
        description:
            "Learn practical ways to reduce water waste and protect resources.",
        icon: ShieldCheck,
        level: "Beginner",
        lessons: [
            "Saving water",
            "Detecting leaks",
            "Efficient water use",
            "Rainwater harvesting",
        ],
    },
    {
        slug: "water-agriculture",
        title: "Water & Agriculture",
        description:
            "Discover how water supports food production and efficient farming.",
        icon: Sprout,
        level: "Intermediate",
        lessons: [
            "Irrigation",
            "Soil moisture",
            "Crop water needs",
            "Drought",
        ],
    },
    {
        slug: "water-quality",
        title: "Water Quality",
        description:
            "Learn how water quality is measured and what can contaminate water.",
        icon: FlaskConical,
        level: "Intermediate",
        lessons: ["pH", "Turbidity", "Contamination", "Water testing"],
    },
    {
        slug: "climate-water",
        title: "Climate & Water",
        description:
            "Explore how rainfall, droughts and floods affect water availability.",
        icon: CloudSun,
        level: "Advanced",
        lessons: ["Rainfall", "Drought", "Floods", "Climate change"],
    },
]

const facts = [
    {
        number: "01",
        title: "Water is constantly moving",
        text: "Water moves between oceans, land, underground stores and the atmosphere through the water cycle.",
    },
    {
        number: "02",
        title: "Freshwater is limited",
        text: "Only a small fraction of Earth's water is freshwater that humans can potentially access.",
    },
    {
        number: "03",
        title: "Water connects ecosystems",
        text: "Rivers, wetlands, lakes and groundwater support plants, animals and entire ecosystems.",
    },
    {
        number: "04",
        title: "Every drop has a journey",
        text: "The water we use today may have travelled through many parts of Earth's water cycle.",
    },
]

const glossary = [
    ["Aquifer", "An underground layer of rock or sediment that can store and transmit groundwater."],
    ["Condensation", "The process where water vapour changes into liquid water."],
    ["Evaporation", "The process where liquid water changes into water vapour."],
    ["Groundwater", "Water stored beneath Earth's surface."],
    ["Infiltration", "The movement of water from the surface into the ground."],
    ["Precipitation", "Water falling from the atmosphere as rain, snow, sleet or hail."],
    ["Runoff", "Water that flows across the land surface."],
    ["Transpiration", "Water vapour released from plants."],
    ["Watershed", "An area of land where water drains toward a common outlet."],
    ["Turbidity", "A measure of how cloudy or unclear water is."],
]

export default function LearningHub() {
    const [search, setSearch] = useState("")

    const filteredTopics = useMemo(() => {
        const query = search.toLowerCase().trim()

        if (!query) return topics

        return topics.filter((topic) =>
            [
                topic.title,
                topic.description,
                topic.level,
                ...topic.lessons,
            ]
                .join(" ")
                .toLowerCase()
                .includes(query)
        )
    }, [search])

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950">
            {/* HERO */}
            <section className="relative overflow-hidden bg-slate-950">
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

            {/* SEARCH */}
            <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-8">
                <div className="rounded-3xl border bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-5">
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Explore
                        </p>
                        <h2 className="mt-1 text-2xl font-bold">
                            What do you want to learn?
                        </h2>
                    </div>

                    <div className="relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search water topics..."
                            className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-12 pr-12 text-base"
                        />

                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* TOPICS */}
            <section id="topics" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="mb-10 flex items-end justify-between gap-6">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Learning library
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            Explore water
                        </h2>
                        <p className="mt-3 max-w-2xl text-slate-500">
                            Start with the fundamentals or dive into a topic that interests
                            you.
                        </p>
                    </div>
                </div>

                {filteredTopics.length === 0 ? (
                    <div className="rounded-3xl border border-dashed bg-white p-16 text-center">
                        <Search className="mx-auto h-10 w-10 text-slate-300" />
                        <h3 className="mt-4 text-lg font-semibold">No topics found</h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Try searching for water cycle, irrigation, groundwater or
                            conservation.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {filteredTopics.map((topic) => {
                            const Icon = topic.icon

                            return (
                                <Link key={topic.slug} href={`/learn/${topic.slug}`}>
                                    <Card className="group h-full rounded-3xl border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/50">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-primary transition-colors group-hover:bg-primary/80 group-hover:text-white">
                                                    <Icon className="h-6 w-6" />
                                                </div>

                                                <Badge
                                                    variant="secondary"
                                                    className="rounded-full bg-slate-100 text-xs font-medium"
                                                >
                                                    {topic.level}
                                                </Badge>
                                            </div>

                                            <h3 className="mt-6 text-xl font-bold">
                                                {topic.title}
                                            </h3>

                                            <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-500">
                                                {topic.description}
                                            </p>

                                            <div className="mt-5">
                                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                    Learn about
                                                </p>

                                                <div className="flex flex-wrap gap-1.5">
                                                    {topic.lessons.map((lesson) => (
                                                        <span
                                                            key={lesson}
                                                            className="rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                                                        >
                                                            {lesson}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-7 flex items-center text-sm font-semibold text-primary">
                                                Explore topic
                                                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </section>

            {/* WATER CYCLE */}
            <section className="border-y bg-white">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                            The fundamentals
                        </p>
                        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                            The journey of water
                        </h2>
                        <p className="mt-4 text-slate-500">
                            Water continuously moves between Earth's surface, atmosphere and
                            underground.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-4 md:grid-cols-5">
                        {[
                            ["01", "Evaporation", "Water gains energy and enters the atmosphere.", Wind],
                            ["02", "Condensation", "Water vapour cools and forms droplets.", CloudRain],
                            ["03", "Precipitation", "Water returns to Earth as rain or other forms.", CloudRain],
                            ["04", "Collection", "Water gathers in rivers, lakes and oceans.", Waves],
                            ["05", "Infiltration", "Some water moves into the ground.", Sprout],
                        ].map(([number, title, text, Icon]) => {
                            const CycleIcon = Icon as typeof Wind

                            return (
                                <div
                                    key={number as string}
                                    className="relative rounded-3xl border bg-slate-50 p-6 text-center"
                                >
                                    <span className="text-xs font-bold text-primary">
                                        {number as string}
                                    </span>

                                    <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                                        <CycleIcon className="h-7 w-7" />
                                    </div>

                                    <h3 className="mt-5 font-bold">{title as string}</h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {text as string}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* FACTS */}
            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Quick knowledge
                        </p>

                        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                            Water facts
                        </h2>

                        <p className="mt-4 leading-7 text-slate-500">
                            A few ideas worth remembering as you explore the rest of
                            AquaMind.
                        </p>

                        <div className="mt-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/90 text-white">
                            <BookOpen className="h-6 w-6" />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {facts.map((fact) => (
                            <div
                                key={fact.number}
                                className="rounded-3xl border bg-white p-6 shadow-sm"
                            >
                                <span className="text-sm font-bold text-primary">
                                    {fact.number}
                                </span>

                                <h3 className="mt-5 font-bold">{fact.title}</h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {fact.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EVERYDAY WATER */}
            <section className="bg-slate-950">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Real-world learning
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                            Water in everyday life
                        </h2>

                        <p className="mt-4 leading-7 text-slate-400">
                            Water science isn't only something you learn about. It affects
                            homes, farms, communities and ecosystems every day.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-4">
                        {[
                            ["At Home", "Learn how everyday choices affect water use.", Droplets],
                            ["Agriculture", "Explore irrigation, soil moisture and farming.", Sprout],
                            ["Communities", "Understand the importance of reliable water systems.", Waves],
                            ["Nature", "Discover how water supports ecosystems.", Leaf],
                        ].map(([title, text, Icon]) => {
                            const WaterIcon = Icon as typeof Leaf

                            return (
                                <div
                                    key={title as string}
                                    className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                                >
                                    <WaterIcon className="h-7 w-7 text-primary" />

                                    <h3 className="mt-6 font-bold text-white">
                                        {title as string}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        {text as string}
                                    </p>

                                    <Link
                                        href="/learn"
                                        className="mt-5 inline-flex items-center text-sm font-semibold text-primary"
                                    >
                                        Learn more
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* LEARNING ORDER */}
            <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                        Suggested starting point
                    </p>

                    <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                        New to water science?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                        Follow this suggested order to build your understanding from the
                        fundamentals upward.
                    </p>
                </div>

                <div className="mt-12 grid gap-3">
                    {topics.map((topic, index) => {
                        const Icon = topic.icon

                        return (
                            <Link
                                href={`/learn/${topic.slug}`}
                                key={topic.slug}
                                className="group flex items-center gap-4 rounded-2xl border bg-white p-4 transition hover:border-sky-200 hover:shadow-sm"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-primary">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold">{topic.title}</h3>
                                    <p className="mt-0.5 truncate text-sm text-slate-500">
                                        {topic.description}
                                    </p>
                                </div>

                                <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:primary" />
                            </Link>
                        )
                    })}
                </div>
            </section>

            {/* GLOSSARY */}
            <section className="border-t bg-white">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="mb-10">
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Reference
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            Water glossary
                        </h2>

                        <p className="mt-3 text-slate-500">
                            Quickly understand common water-science terms.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {glossary.slice(0, 9).map(([term, definition]) => (
                            <div
                                key={term}
                                className="rounded-2xl border bg-slate-50 p-5"
                            >
                                <h3 className="font-bold text-slate-900">{term}</h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {definition}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI CTA */}
            <section className="px-6 py-16">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary px-8 py-14 text-center shadow-lg shadow-primary/40 md:px-14">
                    <Droplets className="mx-auto h-10 w-10 text-white/80" />

                    <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
                        Still have questions?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sky-50">
                        Ask AquaMind anything about water and get an explanation in
                        simple, understandable language.
                    </p>

                    <Link
                        className="mt-8 inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-7 text-sm font-medium text-white transition-colors hover:bg-white/15"
                        href="/ai"
                    >
                        Ask AquaMind
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </section>
        </main>
    )
}