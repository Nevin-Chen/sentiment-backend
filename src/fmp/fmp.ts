export interface OHLC {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercentage: number;
  vwap: number;
}

export interface OHLCResponse {
  data: OHLC[];
}

export interface CompanyProfile {
  symbol: string;
  marketCap: number;
  companyName: string;
  description: string;
  exchange: string;
  sector: string;
  ceo: string;
  employees: number;
  industry: string;
  website: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zip: string
  ipoDate: string;
}
