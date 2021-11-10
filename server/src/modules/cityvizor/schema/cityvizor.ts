
export interface CityvizorProfiles {
  id: number;
  name: string;
  email: string;
  ico: string;
  databox: number | null;
  edesky: number | null;
  mapasamospravy: number | null;
  gpsX?: number;
  gpsY?: number;
  url: string;
}