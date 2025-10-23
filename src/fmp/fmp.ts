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

export type OHLCResponse = OHLC[];

export interface CompanyProfile {
  address: string;
  ceo: string;
  city: string;
  companyName: string;
  country: string;
  description: string;
  employees: number;
  industry: string;
  ipoDate: string;
  marketCap: number;
  sector: string;
  state: string;
  symbol: string;
  exchange: string;
  website: string;
  zip: string
}
