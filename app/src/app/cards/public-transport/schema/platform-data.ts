import { StopData } from "./stop-data";

export type PlatformStopData = Omit<StopData, "platforms">;

export interface PlatformData {
  id: string;
  name: string;
  lat: number;
  lon: number;

  lines?: any[]; // TODO: load routes on backend

  stop: PlatformStopData;
}
