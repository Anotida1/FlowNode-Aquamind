"use client"

import {
    Droplets,
    TrendingDown,
    Gauge,
    Clock,
    Brain,
    AlertTriangle,
    Lightbulb,
    CheckCircle2,
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
        title: "Total Water Used",
        value: "3,420 L",
        description: "Previous week",
        icon: Droplets,
    },
    {
        title: "Average Daily Usage",
        value: "489 L",
        description: "Per day",
        icon: Gauge,
    },
    {
        title: "Water Saved",
        value: "620 L",
        description: "Compared to last week",
        icon: TrendingDown,
    },
    {
        title: "Pump Runtime",
        value: "18.4 hrs",
        description: "Total runtime",
        icon: Clock,
    },
]

export default function WaterAnalytics() {
    return (
        <div className="space-y-6 p-6 bg-muted/30">

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
                    Previous week • Water usage analysis
                </p>
            </div>


            {/* SECTION 1 — STATISTICS */}
            <section className="space-y-3">
                <div>
                    <h2 className="text-lg font-semibold">
                        Previous Week
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Your farm's water usage at a glance
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
                                            <p className="truncate text-xs sm:text-sm text-muted-foreground">
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
                        Insights and recommendations based on your water data
                    </p>
                </div>

                <Card className="overflow-hidden">

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
                                    Based on your previous week's data
                                </p>
                            </div>

                        </div>
                    </CardHeader>


                    <CardContent className="space-y-5 p-4 sm:p-6">

                        {/* Main summary */}
                        <div>
                            <p className="text-sm leading-6 sm:text-base">
                                Your water usage was relatively stable this week.
                                You used an average of{" "}
                                <span className="font-semibold">
                                    489 L per day
                                </span>
                                , while saving approximately{" "}
                                <span className="font-semibold">
                                    620 L
                                </span>{" "}
                                compared with the previous week.
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

                                        <p className="mt-1 text-sm leading-5 text-muted-foreground">
                                            Water consumption increased during your
                                            main irrigation periods. This may be linked
                                            to longer pump operation.
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

                                        <p className="mt-1 text-sm leading-5 text-muted-foreground">
                                            Monitor irrigation duration and avoid
                                            watering when soil moisture is already
                                            sufficient.
                                        </p>
                                    </div>

                                </div>

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
                                        Your current usage pattern looks healthy
                                    </p>
                                </div>

                            </div>

                            <Badge variant="secondary">
                                Monitoring
                            </Badge>

                        </div>

                    </CardContent>
                </Card>
            </section>

        </div>
    )
}