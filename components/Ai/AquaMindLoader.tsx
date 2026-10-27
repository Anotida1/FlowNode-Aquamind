
"use client";

import { Droplets, Waves } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function AquaMindLoader() {
    return (
        <Card className="overflow-hidden border-cyan-500/20">
            <CardContent className="flex flex-col items-center px-6 py-10 text-center">
                <div className="relative flex h-28 w-28 items-center justify-center">
                    {/* Water ripple */}
                    <div className="absolute h-20 w-20 animate-ping rounded-full bg-cyan-500/10 [animation-duration:2.5s]" />

                    <div className="absolute inset-3 rounded-full border border-cyan-500/20" />

                    {/* Water droplet */}
                    <div className="relative flex h-16 w-16 animate-bounce items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 [animation-duration:1.8s]">
                        <Droplets className="h-10 w-10 fill-cyan-500/20 stroke-[1.5]" />
                    </div>

                    <Waves className="absolute bottom-0 right-0 h-7 w-7 text-cyan-600" />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                    AquaMind is thinking
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    Analyzing your soil conditions and identifying crops that may thrive
                    with your available water and nutrients.
                </p>

                {/* Animated progress indicator */}
                <div className="mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-cyan-500/10">
                    <div className="h-full w-1/3 animate-[aquamind-progress_1.8s_ease-in-out_infinite] rounded-full bg-cyan-500" />
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                    Please wait while we analyze your sample...
                </p>
            </CardContent>

            <style jsx>{`
        @keyframes aquamind-progress {
          0% {
            transform: translateX(-110%);
          }
          100% {
            transform: translateX(400%);
          }
        }
      `}</style>
        </Card>
    );
}
