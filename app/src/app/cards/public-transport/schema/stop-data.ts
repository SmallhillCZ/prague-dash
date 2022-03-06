import { PlatformData } from "./platform-data";

export type StopPlatformData = Omit<PlatformData, "stop">;

export interface StopData {
  id: string;
  name: string;
  platforms: StopPlatformData[];
}
