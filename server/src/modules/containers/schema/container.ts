export interface Container {
  id: string;
  district: string;
  lon: number;
  lat: number;
  location: string;
  accessibility: number;
  types: ContainerType[];
}

export interface ContainerType {
  id: string;
  type: number;
  last_measurement: string;
  occupancy: number;
  cleaning_frequency: {
    duration: string;
    frequency: number;
    id: number;
  };
  container_type: string;
}
