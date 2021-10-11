
export interface Card<Definition = any> {
  id: string;
  type: string;

  definition: Definition;

  title: string;
  color?: string;

  lastUpdate?: string;
  notifications?: boolean;
}