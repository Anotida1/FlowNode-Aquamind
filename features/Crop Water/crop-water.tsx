"use client"

import { useMemo, useState } from "react"
import {
    Droplets,
    Search,
    Sprout,
    Thermometer,
    FlaskConical,
    CloudRain,
    ChevronRight,
    Scale,
    AlertTriangle,
    Leaf,
    Gauge,
    X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Crop, Demand } from "@/types/crop-water/types"
import { crops } from "@/features/Crop Water/config"

const demandStyles: Record<Demand, string> = {
    Low: "bg-muted text-muted-foreground border-border",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    High: "bg-orange-50 text-orange-700 border-orange-200",
    "Very High": "bg-red-50 text-red-700 border-red-200",
}

function WaterBar({ value }: { value: number }) {
    return (
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min(value, 100)}%` }}
            />
        </div>
    )
}

function CropCard({
    crop,
    onSelect,
    selected,
    onCompare,
}: {
    crop: Crop
    onSelect: () => void
    selected: boolean
    onCompare: () => void
}) {
    const averageWater = Math.round(
        (crop.water.min + crop.water.max) / 2
    )

    return (
        <Card className="border-border">
            <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="font-semibold">{crop.name}</h3>

                        <p className="mt-0.5 text-xs italic text-muted-foreground">
                            {crop.scientificName}
                        </p>
                    </div>

                    <Badge
                        variant="outline"
                        className={demandStyles[crop.water.demand]}
                    >
                        {crop.water.demand}
                    </Badge>
                </div>

                <Separator className="my-5" />

                <div>
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Seasonal water requirement
                            </p>

                            <p className="mt-1 text-xl font-semibold">
                                {crop.water.min}–{crop.water.max}
                                <span className="ml-1 text-sm font-normal text-muted-foreground">
                                    mm
                                </span>
                            </p>
                        </div>

                        <Droplets className="size-5 text-primary" />
                    </div>

                    <div className="mt-4">
                        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                            <span>Relative requirement</span>
                            <span>{averageWater} mm average</span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div
                                className="h-full rounded-full bg-primary"
                                style={{
                                    width: `${Math.min(
                                        (averageWater / 1500) * 100,
                                        100
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border">
                    <div className="bg-background p-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Gauge className="size-3.5" />
                            Soil moisture
                        </div>

                        <p className="mt-1 text-sm font-medium">
                            {crop.moisture.min}–{crop.moisture.max}%
                        </p>
                    </div>

                    <div className="bg-background p-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <FlaskConical className="size-3.5" />
                            Soil pH
                        </div>

                        <p className="mt-1 text-sm font-medium">
                            {crop.ph.min}–{crop.ph.max}
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex gap-2">
                    <Button
                        className="flex-1"
                        onClick={onSelect}
                    >
                        View water profile
                        <ChevronRight className="ml-1 size-4" />
                    </Button>

                    <Button
                        variant={selected ? "default" : "outline"}
                        size="icon"
                        onClick={onCompare}
                        title="Compare crop"
                    >
                        <Scale className="size-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

function CropDetails({ crop }: { crop: Crop }) {
    const [farmSize, setFarmSize] = useState("1")

    const average = Math.round(
        (crop.water.min + crop.water.max) / 2
    )

    const estimated =
        Number(farmSize || 0) * average * 10

    return (
        <div className="space-y-7">
            <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border bg-primary/5 p-5">
                    <Droplets className="size-5 text-primary" />

                    <p className="mt-4 text-xs text-muted-foreground">
                        Seasonal water requirement
                    </p>

                    <p className="mt-1 text-xl font-semibold">
                        {crop.water.min}–{crop.water.max} mm
                    </p>
                </div>

                <div className="rounded-lg border p-5">
                    <CloudRain className="size-5 text-primary" />

                    <p className="mt-4 text-xs text-muted-foreground">
                        Expected rainfall
                    </p>

                    <p className="mt-1 text-xl font-semibold">
                        {crop.rainfall.min}–{crop.rainfall.max} mm
                    </p>
                </div>
            </div>

            <section>
                <h3 className="mb-3 font-semibold">
                    Water budget calculator
                </h3>

                <div className="rounded-lg border bg-muted/30 p-4">
                    <label className="text-sm font-medium">
                        Farm size
                    </label>

                    <div className="mt-2 flex gap-2">
                        <Input
                            type="number"
                            min="0"
                            value={farmSize}
                            onChange={(e) =>
                                setFarmSize(e.target.value)
                            }
                            className="bg-background"
                        />

                        <div className="flex items-center rounded-md border bg-background px-4 text-sm text-muted-foreground">
                            Hectares
                        </div>
                    </div>

                    <div className="mt-4 rounded-lg border bg-background p-4">
                        <p className="text-xs text-muted-foreground">
                            Approximate seasonal requirement
                        </p>

                        <p className="mt-1 text-xl font-semibold">
                            {estimated.toLocaleString()} m³
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Based on the midpoint of the crop's water requirement.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <div className="mb-4">
                    <h3 className="font-semibold">
                        Water demand by growth stage
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Relative demand compared with the crop's peak requirement.
                    </p>
                </div>

                <div className="space-y-4">
                    {crop.stages.map((stage) => (
                        <div key={stage.name}>
                            <div className="mb-2 flex justify-between text-sm">
                                <span>{stage.name}</span>
                                <span className="text-muted-foreground">
                                    {stage.demand}%
                                </span>
                            </div>

                            <WaterBar value={stage.demand} />
                        </div>
                    ))}
                </div>
            </section>

            <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex gap-3">
                    <AlertTriangle className="mt-0.5 size-5 shrink-0 text-primary" />

                    <div>
                        <p className="font-medium">
                            Critical water period
                        </p>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {crop.criticalStage} is particularly important.
                            Water stress during this period can have a larger
                            effect on yield.
                        </p>
                    </div>
                </div>
            </div>



            <section>
                <h3 className="mb-3 font-semibold">
                    Growing conditions
                </h3>

                <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
                    <div className="bg-background p-4">
                        <Thermometer className="size-4 text-primary" />

                        <p className="mt-2 text-xs text-muted-foreground">
                            Temperature
                        </p>

                        <p className="mt-1 font-medium">
                            {crop.temperature.min}–{crop.temperature.max}°C
                        </p>
                    </div>

                    <div className="bg-background p-4">
                        <FlaskConical className="size-4 text-primary" />

                        <p className="mt-2 text-xs text-muted-foreground">
                            Soil pH
                        </p>

                        <p className="mt-1 font-medium">
                            {crop.ph.min}–{crop.ph.max}
                        </p>
                    </div>

                    <div className="bg-background p-4">
                        <Droplets className="size-4 text-primary" />

                        <p className="mt-2 text-xs text-muted-foreground">
                            Soil moisture
                        </p>

                        <p className="mt-1 font-medium">
                            {crop.moisture.min}–{crop.moisture.max}%
                        </p>
                    </div>
                </div>
            </section>



            <div className="rounded-lg border p-4">
                <div className="flex gap-3">
                    <Leaf className="mt-0.5 size-5 shrink-0 text-primary" />

                    <p className="text-sm leading-6 text-muted-foreground">
                        {crop.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function CropWater() {
    const [search, setSearch] = useState("")
    const [demand, setDemand] = useState("All")
    const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null)
    const [compare, setCompare] = useState<string[]>([])

    const filteredCrops = useMemo(() => {
        return crops.filter((crop) => {
            const query = search.toLowerCase()

            const matchesSearch =
                crop.name.toLowerCase().includes(query) ||
                crop.scientificName.toLowerCase().includes(query)

            const matchesDemand =
                demand === "All" ||
                crop.water.demand === demand

            return matchesSearch && matchesDemand
        })
    }, [search, demand])

    const comparedCrops = crops.filter((crop) =>
        compare.includes(crop.id)
    )

    function toggleCompare(id: string) {
        setCompare((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : current.length < 3
                    ? [...current, id]
                    : current
        )
    }

    return (
        <main className="min-h-screen bg-background">
            {/* HEADER */}

            <section className="border-b">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 text-sm text-primary">
                            <Droplets className="size-4" />
                            AquaMind
                        </div>

                        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Crop water requirements
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                            Explore seasonal water requirements, growing
                            conditions and water demand across different
                            crops.
                        </p>
                    </div>
                </div>
            </section>

            {/* QUICK STATS */}

            <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid divide-y rounded-lg border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                    {[
                        {
                            icon: Droplets,
                            value: "300–1,500+ mm",
                            label: "Seasonal range",
                        },
                        {
                            icon: Sprout,
                            value: "6 crops",
                            label: "In the library",
                        },
                        {
                            icon: Gauge,
                            value: "5 stages",
                            label: "Tracked per crop",
                        },
                        {
                            icon: CloudRain,
                            value: "Rain + irrigation",
                            label: "Water sources",
                        },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-3 p-4"
                        >
                            <item.icon className="size-5 shrink-0 text-primary" />

                            <div>
                                <p className="text-sm font-semibold">
                                    {item.value}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CROP LIBRARY */}

            <section
                id="crop-library"
                className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
            >
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-medium text-primary">
                            Crop library
                        </p>

                        <h2 className="mt-1 text-2xl font-semibold">
                            Water requirements by crop
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                            Compare water requirements, soil conditions and
                            climate ranges.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                placeholder="Search crops"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full pl-9 sm:w-56"
                            />
                        </div>

                        <Select
                            value={demand}
                            onValueChange={(value) => {
                                if (value) setDemand(value)
                            }}
                        >
                            <SelectTrigger className="w-full sm:w-40">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="All">
                                    All water needs
                                </SelectItem>
                                <SelectItem value="Low">
                                    Low
                                </SelectItem>
                                <SelectItem value="Medium">
                                    Medium
                                </SelectItem>
                                <SelectItem value="High">
                                    High
                                </SelectItem>
                                <SelectItem value="Very High">
                                    Very High
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCrops.map((crop) => (
                        <CropCard
                            key={crop.id}
                            crop={crop}
                            selected={compare.includes(crop.id)}
                            onSelect={() =>
                                setSelectedCrop(crop)
                            }
                            onCompare={() =>
                                toggleCompare(crop.id)
                            }
                        />
                    ))}
                </div>

                {filteredCrops.length === 0 && (
                    <div className="border-y py-16 text-center">
                        <Sprout className="mx-auto size-8 text-muted-foreground" />

                        <h3 className="mt-4 font-semibold">
                            No crops found
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Try another search or water requirement.
                        </p>
                    </div>
                )}
            </section>

            {/* COMPARISON */}

            <section
                id="water-comparison"
                className="border-y bg-muted/20 py-10"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-sm font-medium text-primary">
                                Comparison
                            </p>

                            <h2 className="mt-1 text-2xl font-semibold">
                                Compare water requirements
                            </h2>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Select up to three crops from the library.
                            </p>
                        </div>

                        {comparedCrops.length > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCompare([])}
                            >
                                Clear
                            </Button>
                        )}
                    </div>

                    {comparedCrops.length === 0 ? (
                        <div className="mt-6 rounded-lg border border-dashed bg-background p-10 text-center">
                            <Scale className="mx-auto size-8 text-muted-foreground" />

                            <h3 className="mt-4 font-medium">
                                No crops selected
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Select crops above to compare their water
                                requirements.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-6 overflow-x-auto rounded-lg border bg-background">
                            <div className="min-w-[700px]">
                                <div
                                    className="grid border-b bg-muted/30"
                                    style={{
                                        gridTemplateColumns: `180px repeat(${comparedCrops.length}, minmax(180px, 1fr))`,
                                    }}
                                >
                                    <div className="p-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Property
                                    </div>

                                    {comparedCrops.map((crop) => (
                                        <div
                                            key={crop.id}
                                            className="flex items-center gap-2 p-4"
                                        >
                                            <span className="font-medium">
                                                {crop.name}
                                            </span>

                                            <button
                                                className="ml-auto text-muted-foreground"
                                                onClick={() =>
                                                    toggleCompare(crop.id)
                                                }
                                                aria-label={`Remove ${crop.name}`}
                                            >
                                                <X className="size-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {[
                                    {
                                        label: "Water / season",
                                        value: (crop: Crop) =>
                                            `${crop.water.min}–${crop.water.max} mm`,
                                    },
                                    {
                                        label: "Water demand",
                                        value: (crop: Crop) =>
                                            crop.water.demand,
                                    },
                                    {
                                        label: "Soil moisture",
                                        value: (crop: Crop) =>
                                            `${crop.moisture.min}–${crop.moisture.max}%`,
                                    },
                                    {
                                        label: "Soil pH",
                                        value: (crop: Crop) =>
                                            `${crop.ph.min}–${crop.ph.max}`,
                                    },
                                    {
                                        label: "Temperature",
                                        value: (crop: Crop) =>
                                            `${crop.temperature.min}–${crop.temperature.max}°C`,
                                    },
                                    {
                                        label: "Drought tolerance",
                                        value: (crop: Crop) =>
                                            `${crop.droughtTolerance}%`,
                                    },
                                ].map((row) => (
                                    <div
                                        key={row.label}
                                        className="grid border-b last:border-0"
                                        style={{
                                            gridTemplateColumns: `180px repeat(${comparedCrops.length}, minmax(180px, 1fr))`,
                                        }}
                                    >
                                        <div className="p-4 text-sm text-muted-foreground">
                                            {row.label}
                                        </div>

                                        {comparedCrops.map((crop) => (
                                            <div
                                                key={crop.id}
                                                className="p-4 text-sm"
                                            >
                                                {row.value(crop)}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* WATER INFORMATION */}

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-medium text-primary">
                        Understanding crop water use
                    </p>

                    <h2 className="mt-1 text-2xl font-semibold">
                        Water requirements change throughout the season
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        Crops do not require the same amount of water at every
                        stage. Flowering, fruit formation and grain development
                        can require careful water management.
                    </p>
                </div>

                <div className="mt-6 rounded-lg border bg-background p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Example: Maize
                            </p>

                            <p className="mt-1 font-medium">
                                Water demand by growth stage
                            </p>
                        </div>

                        <Droplets className="size-5 text-primary" />
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-5">
                        {[
                            ["Germination", 35],
                            ["Vegetative", 65],
                            ["Flowering", 100],
                            ["Grain Fill", 80],
                            ["Maturity", 30],
                        ].map(([name, value]) => (
                            <div key={String(name)}>
                                <div className="mb-2 flex justify-between text-xs">
                                    <span className="truncate">
                                        {name}
                                    </span>

                                    <span className="ml-2 text-muted-foreground">
                                        {value}%
                                    </span>
                                </div>

                                <Progress value={Number(value)} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DETAIL DIALOG */}

            <Dialog
                open={!!selectedCrop}
                onOpenChange={(open) => {
                    if (!open) setSelectedCrop(null)
                }}
            >
                <DialogContent className="h-[90vh] overflow-y-auto sm:max-w-2xl">
                    {selectedCrop && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-xl">
                                    {selectedCrop.name}
                                </DialogTitle>

                                <p className="text-sm italic text-muted-foreground">
                                    {selectedCrop.scientificName}
                                </p>
                            </DialogHeader>

                            <Separator />

                            <CropDetails crop={selectedCrop} />
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* MOBILE COMPARE */}

            {compare.length > 0 && (
                <div className="fixed bottom-4 left-4 right-4 z-50 sm:hidden">
                    <div className="flex items-center justify-between rounded-lg border bg-background p-3">
                        <div>
                            <p className="text-sm font-medium">
                                {compare.length} crop
                                {compare.length > 1 ? "s" : ""} selected
                            </p>

                            <p className="text-xs text-muted-foreground">
                                Ready to compare
                            </p>
                        </div>

                        <Button
                            size="sm"
                            onClick={() =>
                                document
                                    .getElementById("water-comparison")
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                    })
                            }
                        >
                            Compare
                        </Button>
                    </div>
                </div>
            )}
        </main>
    )
}
