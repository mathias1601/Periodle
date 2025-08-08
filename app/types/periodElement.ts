export interface PeriodElement {
    name: string;
    symbol: string;
    period: number;
    group: number;
    atomicNumber: number;
    stateAtRoomTemp: "solid" | "liquid" | "gas";
    category: string;
    meltingPoint: number;
    yearDiscovered: number | "ancient";
}