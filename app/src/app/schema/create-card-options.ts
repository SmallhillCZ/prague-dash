import { Card } from "./card";

export type CreateCardOptions<CustomCard extends Card = Card> = Pick<CustomCard, "title" | "definition">;