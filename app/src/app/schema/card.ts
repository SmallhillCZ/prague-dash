
export interface Card<Definition = any> {
  id: string;
  type: string;

  definition: Definition;

  color?: string;
  lastUpdate?: string;
  notifications?: boolean;
}
