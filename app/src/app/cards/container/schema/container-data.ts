import { ContainerAccessibilityID } from "./container-accessibility";
import { ContainerTypeID } from "./container-type";

export interface ContainerData {
  id: string;
  district: string;
  lon: number;
  lat: number;
  location: string;
  accessibility: ContainerAccessibilityID;
  types: ContainerDataType[];
}

export interface ContainerDataType {
  id: string;
  type: ContainerTypeID;
  occupancy: number;
  cleaning_frequency: {
    duration: string;
    frequency: number;
    id: number;
    next_pick: string;
    pick_days: string;
  };
  last_measurement: string;
  container_type: string;
}
