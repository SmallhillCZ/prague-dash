export interface Card<T = any, Definition = any> {
  id: string;
  type: T;

  title: string;
  definition: Definition;
}
