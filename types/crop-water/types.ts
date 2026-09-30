export type Demand = "Low" | "Medium" | "High" | "Very High"

export type Crop = {
    id: string
    name: string
    scientificName: string
    water: {
        min: number
        max: number
        demand: Demand
    }
    temperature: {
        min: number
        max: number
    }
    ph: {
        min: number
        max: number
    }
    moisture: {
        min: number
        max: number
    }
    rainfall: {
        min: number
        max: number
    }
    droughtTolerance: number
    stages: {
        name: string
        demand: number
    }[]
    criticalStage: string
    description: string
}
