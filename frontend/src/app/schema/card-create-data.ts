import { Card } from "./card";

export type CardCreateData<T extends Card = Card> = Pick<T, "type" | "title" | "definition">;
