export class GetStopsQuery {
  q?: string;
  lat?: number;
  lon?: number;
  offset?: string;
  limit?: string;
}

export class GetClosestStopQuery {
  lat!: number;
  lon!: number;
}
