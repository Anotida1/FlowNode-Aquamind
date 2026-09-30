import {
    ArrowRight,
    BookOpenText,
    CloudSun,
    Droplets,
    Leaf,
    LifeBuoy,
    MessageSquareText,
    PhoneCall,
    Search,
    ShieldAlert,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

const helpTopics = [
    {
        title: "Weather guidance",
        description: "Review forecast patterns, rainfall risk, and how conditions affect irrigation timing.",
        icon: CloudSun,
    },
    {
        title: "Crop health support",
        description: "Understand stress alerts, disease symptoms, and crop recommendations from your AI scans.",
        icon: Leaf,
    },
    {
        title: "Water planning",
        description: "Balance daily water demand, reservoir levels, and crop-specific watering schedules.",
        icon: Droplets,
    },
]

const quickActions = [
    {
        title: "Search help articles",
        description: "Browse quick-start guides and practical recommendations for daily field operations.",
        icon: Search,
    },
    {
        title: "Talk to support",
        description: "Contact the AquaMind team for custom help with crop planning and platform setup.",
        icon: MessageSquareText,
    },
    {
        title: "Escalate an issue",
        description: "Report a weather alert, crop scan problem, or water planning discrepancy.",
        icon: ShieldAlert,
    },
]

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-muted/30 p-6">
            <div className="mx-auto max-w-6xl space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <LifeBuoy className="h-5 w-5" />
                            </div>
                            <Badge variant="outline">Support center</Badge>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight">Get Help</h1>
                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                            Find answers, diagnose issues, and get expert support for weather, crop health, and irrigation planning.
                        </p>
                    </div>

                    <a
                        href="mailto:anotidaishe.hwena@gmail.com"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
                    >
                        Contact support
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {helpTopics.map(({ title, description, icon: Icon }) => (
                        <Card key={title} className="h-full">
                            <CardHeader>
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-lg">{title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <BookOpenText className="h-4 w-4 text-primary" />
                                <CardTitle>Popular help topics</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-xl border bg-muted/30 p-4">
                                <p className="text-sm font-medium">How do I interpret crop stress alerts?</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Review the scan results, compare crop history, and check current weather conditions before making irrigation changes.
                                </p>
                            </div>
                            <div className="rounded-xl border bg-muted/30 p-4">
                                <p className="text-sm font-medium">Why is my irrigation plan changing?</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Water recommendations update as soil moisture, rainfall patterns, and crop demand shift across the week.
                                </p>
                            </div>
                            <div className="rounded-xl border bg-muted/30 p-4">
                                <p className="text-sm font-medium">What if the weather forecast looks inaccurate?</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Cross-check the live forecast with your local field conditions and adjust your irrigation schedule accordingly.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <PhoneCall className="h-4 w-4 text-primary" />
                                <CardTitle>Need direct help?</CardTitle>
                            </div>
                            <CardDescription>Our support team is available when you need quick action.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {quickActions.map(({ title, description, icon: Icon }) => (
                                <div key={title} className="flex gap-3 rounded-xl border p-3">
                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{title}</p>
                                        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
