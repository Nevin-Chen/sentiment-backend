export interface PolygonAggResult {
  v: number; // volume
  vw: number; // volume weighted
  o: number; // open
  c: number; // close
  h: number; // high
  l: number; // low
  t: number; // timestamp (ms)
  n: number; // number of transactions
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
