"use client"

import {
    Droplets,
    TrendingDown,
    Gauge,
    Brain,
    AlertTriangle,
    Lightbulb,
    CheckCircle2,
    Target,
    Leaf,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

const stats = [
    {
        title: "Estimated Water Used",
        value: "672 L",
        description: "Previous week",
        icon: Droplets,
    },
    {
        title: "Average Daily Usage",
        value: "96 L",
        description: "Estimated per day",
        icon: Gauge,
    },
    {
        title: "Water Saved",
        value: "184 L",
        description: "This week",
        icon: TrendingDown,
    },
    {
        title: "Water Score",
        value: "78 / 100",
        description: "Good conservation habits",
        icon: Target,
    },
]

export default function WaterAnalytics() {
    return (
        <div className="space-y-6 bg-muted/30 p-6">

            {/* Header */}
            <div>
                <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-semibold">
                        Water Analytics
                    </h1>

                    <Badge variant="secondary">
                        AI Powered
                    </Badge>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                    Previous week • Your water conservation overview
                </p>
            </div>


            {/* SECTION 1 — STATISTICS */}
            <section className="space-y-3">
                <div>
                    <h2 className="text-lg font-semibold">
                        Previous Week
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        An overview of your estimated water usage and conservation
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

                    {stats.map((stat) => {
                        const Icon = stat.icon

                        return (
                            <Card key={stat.title}>
                                <CardContent className="p-4 sm:p-5">

                                    <div className="flex items-start justify-between gap-3">

                                        <div className="min-w-0">
                                            <p className="truncate text-xs text-muted-foreground sm:text-sm">
                                                {stat.title}
                                            </p>

                                            <p className="mt-2 text-xl font-semibold sm:text-2xl">
                                                {stat.value}
                                            </p>

                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {stat.description}
                                            </p>
                                        </div>

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <Icon className="h-4 w-4 text-primary" />
                                        </div>

                                    </div>

                                </CardContent>
                            </Card>
                        )
                    })}

                </div>
            </section>


            {/* SECTION 2 — AI OVERVIEW */}
            <section className="space-y-3">

                <div>
                    <h2 className="text-lg font-semibold">
                        AI Water Overview
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Insights and recommendations based on your water habits
                    </p>
                </div>

                <Card className="overflow-hidden">

                    {/* AI Header */}
                    <CardHeader className="border-b">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                <Brain className="h-5 w-5 text-primary" />
                            </div>

                            <div>
                                <CardTitle className="text-base">
                                    AquaMind Analysis
                                </CardTitle>

                                <p className="text-sm text-muted-foreground">
                                    Your personalized water conservation insight
                                </p>
                            </div>

                        </div>

                    </CardHeader>


                    <CardContent className="space-y-5 p-4 sm:p-6">

                        {/* Main AI Summary */}
                        <div className="rounded-xl bg-muted/50 p-5">

                            <div className="mb-3 flex items-center gap-2">
                                <Leaf className="h-5 w-5 text-green-500" />

                                <p className="font-medium">
                                    Weekly Summary
                                </p>
                            </div>

                            <p className="text-sm leading-7 sm:text-base">
                                Your estimated water usage for the previous week was
                                approximately{" "}
                                <span className="font-semibold">
                                    672 litres
                                </span>
                                , averaging around{" "}
                                <span className="font-semibold">
                                    96 litres per day
                                </span>
                                . This puts your estimated daily usage below your
                                current target of 120 litres per day, meaning you
                                are currently using about 80% of your daily water
                                goal.
                            </p>

                            <p className="mt-4 text-sm leading-7 sm:text-base">
                                Your conservation progress is also positive. You
                                have estimated savings of{" "}
                                <span className="font-semibold">
                                    184 litres
                                </span>{" "}
                                this week, which suggests that your recent water
                                habits are helping to reduce unnecessary
                                consumption. Your current AquaMind water score is{" "}
                                <span className="font-semibold">
                                    78 out of 100
                                </span>
                                , placing your current habits in a good range.
                            </p>

                            <p className="mt-4 text-sm leading-7 sm:text-base">
                                There is still room to improve. Rather than making
                                large changes, focus on small everyday actions such
                                as turning off taps when water is not needed,
                                reducing the amount of water used during cleaning,
                                and avoiding unnecessary water use when washing.
                                Consistently maintaining these habits could help
                                you increase your water score while continuing to
                                reduce your overall consumption.
                            </p>

                        </div>


                        {/* AI observations */}
                        <div className="grid gap-3 md:grid-cols-2">

                            {/* Observation */}
                            <div className="rounded-xl border p-4">

                                <div className="flex gap-3">

                                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />

                                    <div>
                                        <p className="font-medium">
                                            What I noticed
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                            Your estimated usage is currently at
                                            96 L per day. While this is below your
                                            120 L daily goal, repeated periods of
                                            unnecessary water use could gradually
                                            increase your overall consumption.
                                            Paying attention to everyday activities
                                            such as bathing, washing and cleaning
                                            can help keep your usage under control.
                                        </p>
                                    </div>

                                </div>

                            </div>


                            {/* Recommendation */}
                            <div className="rounded-xl border p-4">

                                <div className="flex gap-3">

                                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                                    <div>
                                        <p className="font-medium">
                                            Recommendation
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                            Continue aiming to stay below your
                                            120 L daily goal. Start by identifying
                                            one activity where you can reduce
                                            unnecessary water use. Small,
                                            consistent changes are more sustainable
                                            than trying to make large reductions
                                            all at once.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Key metrics */}
                        <div className="grid gap-3 sm:grid-cols-3">

                            <div className="rounded-xl border p-4">
                                <p className="text-sm text-muted-foreground">
                                    Daily goal
                                </p>

                                <p className="mt-1 text-2xl font-semibold">
                                    120 L
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Your current target
                                </p>
                            </div>


                            <div className="rounded-xl border p-4">
                                <p className="text-sm text-muted-foreground">
                                    Estimated usage
                                </p>

                                <p className="mt-1 text-2xl font-semibold">
                                    96 L
                                </p>

                                <p className="mt-1 text-xs text-green-600">
                                    24 L below your goal
                                </p>
                            </div>


                            <div className="rounded-xl border p-4">
                                <p className="text-sm text-muted-foreground">
                                    Water saved
                                </p>

                                <p className="mt-1 text-2xl font-semibold">
                                    184 L
                                </p>

                                <p className="mt-1 text-xs text-green-600">
                                    Positive progress
                                </p>
                            </div>

                        </div>


                        {/* Status */}
                        <div className="flex flex-col gap-3 rounded-xl bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-3">

                                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />

                                <div>
                                    <p className="text-sm font-medium">
                                        Water usage status
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        Your current conservation habits are
                                        moving in a positive direction
                                    </p>
                                </div>

                            </div>

                            <Badge variant="secondary">
                                Good
                            </Badge>

                        </div>

                    </CardContent>
                </Card>
            </section>

        </div>
    )
}