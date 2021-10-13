import { Card } from "src/app/schema/card";

export interface DepartureBoardCardDefinition {
  name?: string;
  allPlatforms: boolean;
  limit?: number;
  showWheelchairAccessible?: boolean;
  timeDisplay?: "time" | "remaining";
  addDelay?: boolean;
  platforms: { [id: string]: boolean; };
}

export type DepartureBoardCard = Card<DepartureBoardCardDefinition>;