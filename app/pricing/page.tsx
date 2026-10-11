"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PricingCardProps = {
    title: string
    oneTimePrice?: number
    description: string
    features: string[]
    actionLabel: string
    popular?: boolean
    exclusive?: boolean
}

const PricingHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <section className="text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-xl pt-1">{subtitle}</p>
        <br />
    </section>
)

const PricingCard = ({ title, oneTimePrice, description, features, actionLabel, popular, exclusive }: PricingCardProps) => (
    <Card
        className={cn(`w-72 flex flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`, {
            "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
                exclusive,
        })}>
        <div>
            <CardHeader className="pb-8 pt-4">
                <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
                <div className="flex gap-0.5">
                    <h3 className="text-3xl font-bold">{oneTimePrice !== undefined ? "$" + oneTimePrice : "Custom"}</h3>
                </div>
                <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {features.map((feature: string) => (
                    <CheckItem key={feature} text={feature} />
                ))}
            </CardContent>
        </div>
        <CardFooter className="mt-2">
            <Button className="relative inline-flex w-full items-center justify-center rounded-md  px-6 font-medium">
                {actionLabel}
            </Button>
        </CardFooter>
    </Card>
)

const CheckItem = ({ text }: { text: string }) => (
    <div className="flex gap-2">
        <CheckCircle2 size={18} className="my-auto text-primary" />
        <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
    </div>
)

export default function page() {
    const plans = [
        {
            title: "Home",
            oneTimePrice: 100,
            description: "Essential water knowledge and tools for everyday households",
            features: [
                "Water literacy chatbot",
                "Water-saving tips",
                "Daily water insights",
                "Basic water usage guidance",
            ],
            actionLabel: "Get Started",
        },
        {
            title: "Growth",
            oneTimePrice: 120,
            description: "Smarter tools to help you understand and manage your water",
            features: [
                "Everything in Home",
                "Advanced water insights",
                "Personalized recommendations",
                "Water usage tracking",
                "AI-powered guidance",
            ],
            actionLabel: "Start Growing",
            popular: true,
        },
        {
            title: "Farmer Kit",
            oneTimePrice: 220,
            description: "Practical water intelligence built for farmers and agriculture",
            features: [
                "Everything in Growth",
                "Farm water management tools",
                "Crop water requirements",
                "Irrigation guidance",
                "AI farming assistant",
                "Water efficiency recommendations",
            ],
            actionLabel: "Get Farmer Kit",
            exclusive: true,
        },
    ];
    return (
        <div className="py-8">
            <PricingHeader title="Pricing Plans" subtitle="Choose the plan that's right for you" />
            <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
                {plans.map((plan) => {
                    return <PricingCard key={plan.title} {...plan} />
                })}
            </section>
        </div>
    )
}