"use client"

import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Droplets,
  Gauge,
  MoreVertical,
  Power,
  RefreshCw,
  Sparkles,
  Thermometer,
  TrendingUp,
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
import { Separator } from "@/components/ui/separator"

export default function TankDashboard() {
  const tankLevel = 72
  const capacity = 5000
  const currentVolume = 3600

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

              <Badge variant="outline" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Online
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Water Management System
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tank overview */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Tank visualization */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Main Water Tank</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tank ID: AM-TANK-001
                  </p>
                </div>

                <Badge>
                  Healthy
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col">

                {/* Tank */}
                <div className="flex justify-center mb-2">
                  <div className="relative h-72 w-52 overflow-hidden rounded-b-[45px] rounded-t-[45px] border-4 border-muted-foreground/20 bg-muted">

                    {/* Water */}
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-700"
                      style={{
                        height: `${tankLevel}%`,
                      }}
                    >
                      {/* Water waves */}
                      {/* Water waves */}
                      <div className="absolute -top-3 left-[-50%] h-8 w-[200%] animate-water-wave rounded-[50%] bg-blue-400/80" />
                    </div>

                    {/* Tank markings */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 text-xs font-medium text-black">
                      <span>100%</span>
                      <span>75%</span>
                      <span>50%</span>
                      <span>25%</span>
                      <span>0%</span>
                    </div>

                    {/* Percentage */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-xl bg-background/90 px-2 py-2 text-center shadow">
                        <p className="text-4xl font-bold">
                          {tankLevel}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Water Level
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tank information */}
                <div className="flex flex-col justify-center space-y-6">

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Volume
                    </p>

                    <p className="text-4xl font-bold">
                      {currentVolume.toLocaleString()}
                      <span className="ml-1 text-lg font-normal text-muted-foreground">
                        L
                      </span>
                    </p>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Tank capacity</span>
                      <span>{capacity.toLocaleString()} L</span>
                    </div>

                    <Progress value={tankLevel} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                        <ArrowUp className="h-4 w-4" />
                        <span className="text-sm">
                          High Level
                        </span>
                      </div>

                      <p className="font-semibold">
                        90%
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                        <ArrowDown className="h-4 w-4" />
                        <span className="text-sm">
                          Low Level
                        </span>
                      </div>

                      <p className="font-semibold">
                        20%
                      </p>
                    </div>

                  </div>

                  <p className="text-xs text-muted-foreground">
                    Last sensor update: 12 seconds ago
                  </p>

                </div>

                <Card className="mt-6 w-full col-span-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>

                      <div>
                        <CardTitle className="text-base">
                          AI Water Advisor
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          Based on your current water data
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-sm leading-relaxed">
                        Your tank is at <strong>72%</strong>, which is a healthy
                        level. Your water usage is slightly higher than yesterday.
                        Consider checking for running taps or possible leaks if this
                        continues.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-blue-500/10 p-3">
                  <Droplets className="h-6 w-6 text-blue-500" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Today's Usage
                  </p>

                  <p className="text-2xl font-bold">
                    1,240 L
                  </p>

                  <p className="text-xs text-green-600 flex flex-row items-center gap-2">
                    <TrendingUp size={12} /> 8% from yesterday
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-cyan-500/10 p-3">
                  <Waves className="h-6 w-6 text-cyan-500" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Flow Rate
                  </p>

                  <p className="text-2xl font-bold">
                    12.4 L/min
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Current flow
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-orange-500/10 p-3">
                  <Thermometer className="h-6 w-6 text-orange-500" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Water Temperature
                  </p>

                  <p className="text-2xl font-bold">
                    24.6°C
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Normal range
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-green-500/10 p-3">
                  <Activity className="h-6 w-6 text-green-500" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Sensor Status
                  </p>

                  <p className="text-2xl font-bold">
                    Normal
                  </p>

                  <p className="text-xs text-green-600">
                    All sensors operational
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Lower section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">

              <div className="flex items-center gap-3 rounded-lg border p-4">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />

                <div className="flex-1">
                  <p className="font-medium">
                    Water consumption increased
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Usage is 12% higher than the daily average.
                  </p>
                </div>

                <Badge variant="outline">
                  Monitor
                </Badge>
              </div>

            </CardContent>
          </Card>



          {/* Pump control */}
          <Card>
            <CardHeader>
              <CardTitle>Pump Control</CardTitle>
              <p className="text-sm text-muted-foreground">
                Main water pump
              </p>
            </CardHeader>

            <CardContent className="space-y-6">

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-500/10 p-3">
                    <Power className="h-5 w-5 text-green-500" />
                  </div>

                  <div>
                    <p className="font-medium">
                      Pump Status
                    </p>

                    <p className="text-sm text-green-600">
                      Running
                    </p>
                  </div>
                </div>

                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>

              <Separator />

              <div>
                <p className="mb-3 text-sm font-medium">
                  Pump Mode
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <Button>
                    Automatic
                  </Button>

                  <Button variant="outline">
                    Manual
                  </Button>
                </div>
              </div>

              <Button
                variant="destructive"
                className="w-full"
              >
                Turn Pump Off
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Automatic mode will control the pump based
                on tank level.
              </p>

            </CardContent>
          </Card>

        </div>


      </div>
    </div>
  )
}