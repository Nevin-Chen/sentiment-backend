export interface OHLC {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  vwap: number;
}

export type OHLCResponse = {
  data: OHLC[];
  source: 'FMP' | 'Massive';
}
