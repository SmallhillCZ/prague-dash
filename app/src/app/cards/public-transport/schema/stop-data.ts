export interface StopPlatformData {
  id: string;
  name: string;
  lat: number;
  lon: number;

  lines?: any[]; // TODO: load routes on backend
}

export interface StopData {
  id: string;
  name: string;
  platforms: StopPlatformData[];

}