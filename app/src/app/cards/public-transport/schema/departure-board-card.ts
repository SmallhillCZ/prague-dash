import { Card } from "src/app/schema/card";

export interface DepartureBoardCardDefinition {
  name?: string;
  id?: string;
  limit?: number;
  showWheelchairAccessible?: boolean;
  timeDisplay?: "time" | "remaining";
  addDelay?: boolean;
}

export type DepartureBoardCard = Card<DepartureBoardCardDefinition>;