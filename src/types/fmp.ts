export type FMPOhlcResponse = FMPOhlc[]
export type FMPProfileResponse = FMPProfile[]

export interface FMPProfile {
  symbol: string;
  price: number;
  marketCap: number;
  beta: number;
  lastDividend: number;
  range: string;
  change: number;
  changePercentage: number;
  volume: number;
  averageVolume: number;
  companyName: string;
  currency: string;
  cik: string;
  isin: string;
  cusip: string;
  exchangeFullName: string;
  exchange: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  image: string;
  ipoDate: string;
  defaultImage: boolean;
  isEtf: boolean;
  isActivelyTrading: boolean;
  isAdr: boolean;
  isFund: boolean;
}

export interface FMPOhlc {
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

export interface CompanyProfile {
  address: string;
  ceo: string;
  city: string;
  companyName: string;
  country: string;
  description: string;
  employees: string;
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
