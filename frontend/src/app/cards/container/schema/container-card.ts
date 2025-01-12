import { Card } from "src/app/schema/card";

export interface ContainerCardDefinition {
  id: string;
  showNotMetered?: boolean;
}

export type ContainerCard = Card<"container", ContainerCardDefinition>;