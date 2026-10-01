"use client"

import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    Droplets,
    Leaf,
    Lightbulb,
    Target,
    TrendingDown,
    Trophy,
    Waves,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function AquaMindDashboard() {
    // Static dashboard data
    const waterScore = 78
    const dailyGoal = 120
    const estimatedUsage = 96
    const waterSaved = 184

    const goalProgress = Math.round(
        (estimatedUsage / dailyGoal) * 100
    )

    const router = useRouter()

    return (
        <div className="min-h-screen bg-muted/30 p-6">
            <div className="mx-auto max-w-7xl space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight">
                                AquaMind
                            </h1>

                            <Badge
                                variant="outline"
                                className="gap-1"
                            >
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                Water Smart
                            </Badge>
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Your personal water literacy dashboard
                        </p>
                    </div>

                    <Button onClick={() => router.push("learn")} variant="outline" size="sm">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Learn About Water
                    </Button>
                </div>

                {/* Main overview */}
                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Water Score */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Water Score</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        Your conservation habits
                                    </p>
                                </div>

                                <div className="rounded-lg bg-blue-500/10 p-2">
                                    <Droplets className="h-5 w-5 text-blue-500" />
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-bold">
                                    {waterScore}
                                </span>

                                <span className="mb-2 text-muted-foreground">
                                    / 100
                                </span>
                            </div>

                            <div className="mt-4">
                                <Progress value={waterScore} />
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                                <TrendingDown className="h-4 w-4" />
                                <span>
                                    Good conservation habits
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Water impact */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>
                                        Your Water Impact
                                    </CardTitle>

                                    <p className="text-sm text-muted-foreground">
                                        This week's conservation progress
                                    </p>
                                </div>

                                <div className="rounded-lg bg-green-500/10 p-2">
                                    <Leaf className="h-5 w-5 text-green-500" />
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="grid gap-6 sm:grid-cols-2">

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Water saved
                                    </p>

                                    <div className="mt-1 flex items-baseline gap-2">
                                        <span className="text-4xl font-bold">
                                            {waterSaved}
                                        </span>

                                        <span className="text-muted-foreground">
                                            L
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm text-green-600">
                                        Great progress this week
                                    </p>
                                </div>

                                <div className="rounded-lg bg-muted/50 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-green-500/10 p-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                Conservation goal
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                On track
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Today's insight */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10">
                                    <Lightbulb className="h-6 w-6 text-yellow-500" />
                                </div>

                                <div>
                                    <Badge variant="secondary">
                                        Today's Water Insight
                                    </Badge>

                                    <h2 className="mt-2 text-lg font-semibold">
                                        Small changes can make a big difference.
                                    </h2>

                                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                        Reducing unnecessary water use while
                                        washing, cleaning, and bathing can
                                        significantly reduce your daily
                                        consumption.
                                    </p>
                                </div>
                            </div>

                            <Button variant="outline" className="shrink-0">
                                Learn More
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">

                    {/* Daily usage */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-blue-500/10 p-3">
                                    <Waves className="h-6 w-6 text-blue-500" />
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Estimated Daily Usage
                                    </p>

                                    <p className="text-2xl font-bold">
                                        {estimatedUsage} L
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        Based on your current habits
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Daily goal */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-purple-500/10 p-3">
                                    <Target className="h-6 w-6 text-purple-500" />
                                </div>

                                <div className="flex-1">
                                    <p className="text-sm text-muted-foreground">
                                        Daily Water Goal
                                    </p>

                                    <p className="text-2xl font-bold">
                                        {dailyGoal} L
                                    </p>

                                    <div className="mt-2">
                                        <Progress value={goalProgress} />
                                    </div>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {dailyGoal - estimatedUsage} L remaining
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Achievement */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-yellow-500/10 p-3">
                                    <Trophy className="h-6 w-6 text-yellow-500" />
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Current Achievement
                                    </p>

                                    <p className="text-2xl font-bold">
                                        Water Saver
                                    </p>

                                    <p className="text-xs text-green-600">
                                        7 day streak
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* AI Advisor */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Droplets className="h-5 w-5 text-primary" />
                            </div>

                            <div>
                                <CardTitle>
                                    AquaMind AI
                                </CardTitle>

                                <p className="text-xs text-muted-foreground">
                                    Your water literacy buddy
                                </p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="rounded-xl bg-muted/50 p-5">
                            <p className="text-sm leading-relaxed">
                                <strong>You're doing well!</strong>{" "}
                                Your current water score is 78/100.
                                Try focusing on reducing unnecessary
                                water use during showers and household
                                cleaning to improve your conservation
                                habits.
                            </p>

                            <Button className="mt-4">
                                Ask AquaMind
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Learn section */}
                <div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">
                            Learn & Explore
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Improve your understanding of water and
                            conservation.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <Card className="group cursor-pointer transition hover:-translate-y-1 hover:shadow-md">
                            <CardContent className="p-5">
                                <div className="mb-4 rounded-lg bg-blue-500/10 p-3 w-fit">
                                    <Droplets className="h-5 w-5 text-blue-500" />
                                </div>

                                <h3 className="font-semibold">
                                    Water Conservation
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Discover simple ways to save water.
                                </p>

                                <ArrowRight className="mt-4 h-4 w-4 transition group-hover:translate-x-1" />
                            </CardContent>
                        </Card>

                        <Card className="group cursor-pointer transition hover:-translate-y-1 hover:shadow-md">
                            <CardContent className="p-5">
                                <div className="mb-4 rounded-lg bg-green-500/10 p-3 w-fit">
                                    <Leaf className="h-5 w-5 text-green-500" />
                                </div>

                                <h3 className="font-semibold">
                                    Water & Climate
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Understand water's role in our climate.
                                </p>

                                <ArrowRight className="mt-4 h-4 w-4 transition group-hover:translate-x-1" />
                            </CardContent>
                        </Card>

                        <Card className="group cursor-pointer transition hover:-translate-y-1 hover:shadow-md">
                            <CardContent className="p-5">
                                <div className="mb-4 rounded-lg bg-cyan-500/10 p-3 w-fit">
                                    <Waves className="h-5 w-5 text-cyan-500" />
                                </div>

                                <h3 className="font-semibold">
                                    Water Quality
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Learn what makes water safe and clean.
                                </p>

                                <ArrowRight className="mt-4 h-4 w-4 transition group-hover:translate-x-1" />
                            </CardContent>
                        </Card>

                        <Card className="group cursor-pointer transition hover:-translate-y-1 hover:shadow-md">
                            <CardContent className="p-5">
                                <div className="mb-4 rounded-lg bg-purple-500/10 p-3 w-fit">
                                    <BookOpen className="h-5 w-5 text-purple-500" />
                                </div>

                                <h3 className="font-semibold">
                                    Water Guide
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Explore water facts and useful guides.
                                </p>

                                <ArrowRight className="mt-4 h-4 w-4 transition group-hover:translate-x-1" />
                            </CardContent>
                        </Card>

                    </div>
                </div>

            </div>
        </div>
    )
}