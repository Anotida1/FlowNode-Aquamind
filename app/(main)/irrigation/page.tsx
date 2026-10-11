import { Card, CardHeader, CardContent, } from "@/components/ui/card";

export default function IrrigationZonesCard() {
    return (
        <div className="flex flex-col gap-4 p-2">
            Irrigation zones
            <Card className="flex flex-col gap-2">
                <CardContent>
                    <p className="text-2xl font-bold">{"value"}</p>
                    <p className="text-sm text-muted-foreground">{"description"}</p>
                </CardContent>
            </Card>
        </div>
    );
}
