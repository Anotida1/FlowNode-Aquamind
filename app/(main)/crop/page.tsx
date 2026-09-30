"use client"

import { useRef, useState } from "react"
import {
    Camera,
    CheckCircle2,
    Droplets,
    ImagePlus,
    Leaf,
    Loader2,
    ScanLine,
    Sparkles,
    Thermometer,
    Upload,
    X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

type WaterStressResult = {
    stressScore: number
    stressLevel:
    | "No significant stress"
    | "Mild stress"
    | "Moderate stress"
    | "Severe stress"
    confidence: number
    crop: string
    visualSigns: string[]

    advice: {
        summary: string
        recommendation: string
    }

    evidence: {
        type:
        | "crop_appearance"
        | "soil_moisture"
        | "environment"
        title: string
        description: string
    }[]

    metadata: {
        analyzedAt: string
        imageName: string
        imageType: string
    }
}

export default function WaterStressPage() {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [image, setImage] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)

    const [scanning, setScanning] = useState(false)
    const [result, setResult] = useState(false)

    const [analysis, setAnalysis] =
        useState<WaterStressResult | null>(null)

    const [error, setError] = useState<string | null>(null)
    const [dragging, setDragging] = useState(false)

    // ----------------------------------------
    // Handle selected file
    // ----------------------------------------

    const handleImage = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.")
            return
        }

        setError(null)

        // Remove old object URL
        if (image) {
            URL.revokeObjectURL(image)
        }

        const preview = URL.createObjectURL(file)

        setImage(preview)
        setImageFile(file)

        setResult(false)
        setAnalysis(null)
    }

    // ----------------------------------------
    // File input
    // ----------------------------------------

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0]

        if (file) {
            handleImage(file)
        }
    }

    // ----------------------------------------
    // Drag events
    // ----------------------------------------

    const handleDragOver = (
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault()
        setDragging(true)
    }

    const handleDragLeave = (
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault()
        setDragging(false)
    }

    const handleDrop = (
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault()
        setDragging(false)

        const file = event.dataTransfer.files?.[0]

        if (file) {
            handleImage(file)
        }
    }

    // ----------------------------------------
    // Remove image
    // ----------------------------------------

    const removeImage = () => {
        if (image) {
            URL.revokeObjectURL(image)
        }

        setImage(null)
        setImageFile(null)
        setAnalysis(null)
        setResult(false)
        setError(null)

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    // ----------------------------------------
    // Analyze
    // ----------------------------------------

    const handleScan = async () => {
        if (!imageFile) {
            setError("Please upload a crop image first.")
            return
        }

        try {
            setScanning(true)
            setError(null)

            const formData = new FormData()

            formData.append("image", imageFile)

            const response = await fetch(
                "/api/water-stress",
                {
                    method: "POST",
                    body: formData,
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Failed to analyze the image."
                )
            }

            setAnalysis(data.data)
            setResult(true)
        } catch (error) {
            console.error(error)

            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            )
        } finally {
            setScanning(false)
        }
    }

    return (
        <div className="min-h-screen bg-muted/30 p-6">
            <div className="mx-auto max-w-6xl space-y-6">

                {/* HEADER */}

                <div>
                    <div className="flex items-center gap-2">

                        <div className="rounded-lg bg-primary/10 p-2">
                            <Leaf className="h-5 w-5 text-primary" />
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight">
                            Water Stress Scan
                        </h1>

                        <Badge
                            variant="secondary"
                            className="gap-1"
                        >
                            <Sparkles className="h-3 w-3" />
                            AI
                        </Badge>

                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Scan your crop to identify possible
                        signs of water stress.
                    </p>
                </div>

                {/* ERROR */}

                {error && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                        {error}
                    </div>
                )}

                {!result ? (

                    <div className="grid gap-6 lg:grid-cols-5">

                        {/* =============================
                            UPLOAD CARD
                        ============================== */}

                        <Card className="lg:col-span-3">

                            <CardHeader>

                                <CardTitle>
                                    Scan your crop
                                </CardTitle>

                                <CardDescription>
                                    Upload or take a clear photo
                                    of the leaves and canopy.
                                </CardDescription>

                            </CardHeader>

                            <CardContent className="space-y-5">

                                {/* Hidden file input */}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

                                {/* =============================
                                    DROPZONE
                                ============================== */}

                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => {
                                        if (!scanning) {
                                            fileInputRef.current?.click()
                                        }
                                    }}
                                    onKeyDown={(event) => {
                                        if (
                                            event.key ===
                                            "Enter" ||
                                            event.key === " "
                                        ) {
                                            fileInputRef.current?.click()
                                        }
                                    }}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`
                                        relative flex min-h-[380px]
                                        cursor-pointer
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        rounded-xl
                                        border-2
                                        border-dashed
                                        transition
                                        ${dragging
                                            ? "border-primary bg-primary/10"
                                            : "bg-muted/40 hover:bg-muted/60"
                                        }
                                    `}
                                >

                                    {image ? (

                                        <>
                                            <img
                                                src={image}
                                                alt="Selected crop"
                                                className="absolute inset-0 h-full w-full object-cover"
                                            />

                                            {/* Remove */}

                                            {!scanning && (
                                                <button
                                                    type="button"
                                                    aria-label="Remove image"
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        removeImage()
                                                    }}
                                                    className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-2 shadow transition hover:bg-background"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}

                                            {/* File name */}

                                            {!scanning && (
                                                <div className="absolute bottom-3 left-3 right-3">

                                                    <div className="rounded-lg bg-background/90 px-3 py-2 text-xs backdrop-blur">

                                                        <p className="truncate font-medium">
                                                            {imageFile?.name}
                                                        </p>

                                                        <p className="text-muted-foreground">
                                                            Click to choose
                                                            another image
                                                        </p>

                                                    </div>

                                                </div>
                                            )}

                                            {/* Scanning */}

                                            {scanning && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">

                                                    <div className="rounded-xl bg-background p-6 text-center shadow-lg">

                                                        <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-primary" />

                                                        <p className="font-semibold">
                                                            Analyzing crop...
                                                        </p>

                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            AquaMind is
                                                            checking for
                                                            signs of water
                                                            stress
                                                        </p>

                                                    </div>

                                                </div>
                                            )}

                                        </>

                                    ) : (

                                        <div className="pointer-events-none px-6 text-center">

                                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">

                                                {dragging ? (
                                                    <Upload className="h-8 w-8 text-primary" />
                                                ) : (
                                                    <ImagePlus className="h-8 w-8 text-primary" />
                                                )}

                                            </div>

                                            <h3 className="font-semibold">

                                                {dragging
                                                    ? "Drop your crop image here"
                                                    : "Upload a crop image"}

                                            </h3>

                                            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">

                                                Drag and drop an image here,
                                                or click anywhere in this
                                                area to select one.

                                            </p>

                                            <p className="mt-4 text-xs text-muted-foreground">

                                                JPG, PNG or WEBP

                                            </p>

                                        </div>

                                    )}

                                </div>

                                {/* Analyze */}

                                {image && !scanning && (

                                    <Button
                                        onClick={handleScan}
                                        className="w-full"
                                        size="lg"
                                    >
                                        <ScanLine className="mr-2 h-4 w-4" />

                                        Analyze Water Stress

                                    </Button>

                                )}

                            </CardContent>

                        </Card>

                        {/* =============================
                            HOW IT WORKS
                        ============================== */}

                        <Card className="lg:col-span-2">

                            <CardHeader>

                                <CardTitle>
                                    How AquaMind analyzes
                                </CardTitle>

                                <CardDescription>
                                    Your image is analyzed by
                                    AquaMind's AI.
                                </CardDescription>

                            </CardHeader>

                            <CardContent className="space-y-5">

                                <div className="flex gap-3">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">

                                        <Leaf className="h-4 w-4 text-primary" />

                                    </div>

                                    <div>

                                        <p className="font-medium">
                                            Crop appearance
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            AI looks for visible
                                            patterns that may be
                                            consistent with water
                                            stress.
                                        </p>

                                    </div>

                                </div>

                                <Separator />

                                <div className="flex gap-3">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">

                                        <Droplets className="h-4 w-4 text-blue-500" />

                                    </div>

                                    <div>

                                        <p className="font-medium">
                                            Soil moisture
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            Connected sensor readings
                                            can provide additional
                                            evidence.
                                        </p>

                                    </div>

                                </div>

                                <Separator />

                                <div className="flex gap-3">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">

                                        <Thermometer className="h-4 w-4 text-orange-500" />

                                    </div>

                                    <div>

                                        <p className="font-medium">
                                            Environment
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            Temperature, rainfall and
                                            irrigation data can provide
                                            additional context.
                                        </p>

                                    </div>

                                </div>

                                <div className="rounded-lg bg-muted p-4">

                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                        AI results are estimates based
                                        on available evidence. They
                                        should not replace physical
                                        inspection of the crop or soil.
                                    </p>

                                </div>

                            </CardContent>

                        </Card>

                    </div>

                ) : (

                    /* =============================
                       RESULTS
                    ============================== */

                    <div className="space-y-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-semibold">
                                    Water Stress Analysis
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Analysis completed just now
                                </p>

                            </div>

                            <Button
                                variant="outline"
                                onClick={removeImage}
                            >
                                New Scan
                            </Button>

                        </div>

                        {analysis && (

                            <>

                                <div className="grid gap-6 lg:grid-cols-3">

                                    {/* IMAGE */}

                                    <Card className="overflow-hidden">

                                        <div className="relative aspect-square">

                                            <img
                                                src={image!}
                                                alt="Scanned crop"
                                                className="h-full w-full object-cover"
                                            />

                                            <div className="absolute bottom-3 left-3">

                                                <Badge className="gap-1 bg-background/90 text-foreground backdrop-blur">

                                                    <CheckCircle2 className="h-3 w-3" />

                                                    Scan complete

                                                </Badge>

                                            </div>

                                        </div>

                                    </Card>

                                    {/* SCORE */}

                                    <Card>

                                        <CardHeader>

                                            <CardTitle>
                                                Water Stress Level
                                            </CardTitle>

                                            <CardDescription>
                                                Estimated from visible
                                                evidence
                                            </CardDescription>

                                        </CardHeader>

                                        <CardContent className="space-y-6">

                                            <div className="text-center">

                                                <div className="text-6xl font-bold">
                                                    {analysis.stressScore}%
                                                </div>

                                                <Badge className="mt-3">
                                                    {analysis.stressLevel}
                                                </Badge>

                                            </div>

                                            <Progress
                                                value={
                                                    analysis.stressScore
                                                }
                                            />

                                            <div className="grid grid-cols-2 gap-3 text-center">

                                                <div className="rounded-lg border p-3">

                                                    <p className="text-2xl font-bold">
                                                        {analysis.confidence}%
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        AI confidence
                                                    </p>

                                                </div>

                                                <div className="rounded-lg border p-3">

                                                    <p className="truncate text-lg font-bold">
                                                        {analysis.crop}
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        Crop
                                                    </p>

                                                </div>

                                            </div>

                                        </CardContent>

                                    </Card>

                                    {/* ADVICE */}

                                    <Card>

                                        <CardHeader>

                                            <CardTitle className="flex items-center gap-2">

                                                <Sparkles className="h-4 w-4 text-primary" />

                                                AquaMind Advice

                                            </CardTitle>

                                        </CardHeader>

                                        <CardContent>

                                            <div className="rounded-xl bg-muted/60 p-5">

                                                <p className="text-sm leading-6">
                                                    {analysis.advice.summary}
                                                </p>

                                                <p className="mt-4 text-sm font-medium">
                                                    {analysis.advice.recommendation}
                                                </p>

                                            </div>

                                        </CardContent>

                                    </Card>

                                </div>

                                {/* VISUAL SIGNS */}

                                <Card>

                                    <CardHeader>

                                        <CardTitle>
                                            Visible Signs
                                        </CardTitle>

                                        <CardDescription>
                                            What AquaMind detected
                                            in the image
                                        </CardDescription>

                                    </CardHeader>

                                    <CardContent>

                                        <div className="flex flex-wrap gap-2">

                                            {analysis.visualSigns.map(
                                                (sign, index) => (

                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="px-3 py-1"
                                                    >
                                                        {sign}
                                                    </Badge>

                                                )
                                            )}

                                        </div>

                                    </CardContent>

                                </Card>

                                {/* EVIDENCE */}

                                <Card>

                                    <CardHeader>

                                        <CardTitle>
                                            What AquaMind Found
                                        </CardTitle>

                                        <CardDescription>
                                            Factors contributing to
                                            the assessment
                                        </CardDescription>

                                    </CardHeader>

                                    <CardContent className="grid gap-4 md:grid-cols-3">

                                        {analysis.evidence.map(
                                            (item, index) => (

                                                <div
                                                    key={`${item.type}-${index}`}
                                                    className="rounded-lg border p-4"
                                                >

                                                    <div className="mb-3 flex items-center gap-2">

                                                        {item.type ===
                                                            "soil_moisture" ? (
                                                            <Droplets className="h-4 w-4 text-blue-500" />
                                                        ) : item.type ===
                                                            "environment" ? (
                                                            <Thermometer className="h-4 w-4 text-orange-500" />
                                                        ) : (
                                                            <Leaf className="h-4 w-4 text-primary" />
                                                        )}

                                                        <span className="font-medium">
                                                            {item.title}
                                                        </span>

                                                    </div>

                                                    <p className="text-sm text-muted-foreground">
                                                        {item.description}
                                                    </p>

                                                </div>

                                            )
                                        )}

                                    </CardContent>

                                </Card>

                            </>

                        )}

                    </div>
                )}

            </div>
        </div>
    )
}
