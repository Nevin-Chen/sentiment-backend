export interface PolygonAggResult {
  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
}

export interface PolygonResponse {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: PolygonAggResult[];
  status: string;
  request_id?: string;
  count?: number;
}
