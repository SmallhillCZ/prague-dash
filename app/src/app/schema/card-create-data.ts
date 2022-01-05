import { Card } from "./card";

export type CardCreateData<T extends Card = Card> = Pick<T, "title" | "definition">;