export class GetDepartureBoardsQuery {
  name?: string[];
  id?: string[];
  limit?: number;
  offset?: number;
}

export class GetClosestDepartureBoardsQuery {
  lat!: number;
  lon!: number;
  limit?: number;
  offset?: number;
}
