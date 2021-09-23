import { ContainerType } from "./container-type";

export interface ContainerData {
  id: string;
  district: string;
  lon: number;
  lat: number;
  location: string;
  types: {
    id: string;
    type: ContainerType;
    occupancy: number;
  }[];
}