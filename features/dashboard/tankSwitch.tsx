import { useState } from "react";
import { Power } from "lucide-react";

export default function TankSwitch() {
    const [isRunning, setIsRunning] = useState(false);

    return (
        <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsRunning(prev => !prev)}
                    className={`rounded-full p-3 transition-colors ${isRunning
                            ? "bg-green-500/10 hover:bg-green-500/20"
                            : "bg-red-500/10 hover:bg-red-500/20"
                        }`}
                    aria-label={isRunning ? "Turn pump off" : "Turn pump on"}
                >
                    <Power className={`h-5 w-5 ${isRunning ? "text-green-500" : "text-red-500"
                        }`} />
                </button>

                <div>
                    <p className="font-medium">Pump Status</p>
                    <p className={`text-sm ${isRunning ? "text-green-600" : "text-red-600"
                        }`}>
                        {isRunning ? "Running" : "Stopped"}
                    </p>
                </div>
            </div>

            <div className={`h-3 w-3 rounded-full ${isRunning ? "bg-green-500" : "bg-red-500"
                }`} />
        </div>
    );
}