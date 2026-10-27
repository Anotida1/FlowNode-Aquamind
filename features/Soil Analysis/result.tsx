
import {
    Apple,
    Carrot,
    ChevronRight,
    Droplets,
    Palmtree,
    Sprout,
    Wheat,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

const categoryIcons = {
    grain: Wheat,
    vegetable: Carrot,
    fruit: Apple,
    legume: Sprout,
    root: Carrot,
};

function getSuitability(suitability: number) {
    if (suitability >= 80) {
        return {
            label: "Highly suitable",
            color: "text-emerald-600 dark:text-emerald-400",
        };
    }

    if (suitability >= 60) {
        return {
            label: "Suitable",
            color: "text-cyan-600 dark:text-cyan-400",
            bar: "[&>div]:bg-cyan-500",
        };
    }

    if (suitability >= 40) {
        return {
            label: "Moderately suitable",
            color: "text-amber-600 dark:text-amber-400",
        };
    }

    return {
        label: "Less suitable",
        color: "text-rose-600 dark:text-rose-400",
    };
}

export default function SoilAnalysisResults({
    result,
}: {
    result: SoilAnalysisResult[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Droplets className="h-5 w-5 text-cyan-600" />
                    Recommended Crops
                </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {result.map((crop, index) => {
                    const CategoryIcon =
                        categoryIcons[crop.category] || Palmtree;

                    const suitability = Math.max(
                        0,
                        Math.min(100, Number(crop.suitability) || 0)
                    );

                    const status = getSuitability(suitability);

                    return (
                        <Popover key={`${crop.crop}-${index}`}>
                            <PopoverTrigger
                                className="group flex w-full items-start justify-between gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:border-cyan-500/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                            >
                                <div className="flex min-w-0 flex-1 items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600">
                                        <CategoryIcon className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold">{crop.crop}</h3>

                                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                            {crop.description}
                                        </p>

                                        <div className="mt-4 space-y-2">

                                            <Progress
                                                value={suitability}
                                                className={`h-1.5`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-1">
                                    <span className={`text-lg font-bold ${status.color}`}>
                                        {suitability}%
                                    </span>

                                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                                </div>
                            </PopoverTrigger>

                            <PopoverContent className="w-80">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-600">
                                            <CategoryIcon className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h4 className="font-semibold">{crop.crop}</h4>
                                            <p className={`text-xs ${status.color}`}>{status.label}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm leading-6 text-muted-foreground">
                                        {crop.description}
                                    </p>

                                    <div className="space-y-2 border-t pt-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Suitability score
                                            </span>
                                            <span className="font-semibold">{suitability}%</span>
                                        </div>

                                        <Progress
                                            value={suitability}
                                            className={`h-2`}
                                        />
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    );
                })}
            </CardContent>
        </Card>
    );
}
