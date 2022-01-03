import { ContainerAccessibilityID } from "./container-accessibility";
import { ContainerType } from "./container-type";

export interface ContainerData {
  id: string;
  district: string;
  lon: number;
  lat: number;
  location: string;
  accessibility: ContainerAccessibilityID,
  types: {
    id: string;
    type: ContainerType;
    occupancy: number;
    cleaning_frequency: {
      duration: string,
      frequency: number,
      id: number;
    };
    container_type: string;
  }[];
}