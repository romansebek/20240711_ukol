export interface Sensor {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    lastValue: number;
    lastValueTime: string;
    unit: string;
    parent?: number;
    children?: number[];
}