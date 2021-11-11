export interface Container {
  id: string;
  district: string;
  lon: number;
  lat: number;
  location: string;
  types: ContainerType[];
}

export interface ContainerType {
  id: string;
  type: number;
  occupancy: number;
}