import axios from 'axios';
import { CompanyProfile } from '../types/fmp';
import { OHLC } from '../types/ohlc';
import { format, subYears } from 'date-fns';
import { getCache, setCache } from './redis';

export class FMPService {
  private apikey = process.env.FMP_API_KEY || '';
  private base_url = "https://financialmodelingprep.com/stable"

  public async getHistoricalData(symbol: string): Promise<OHLC[]> {
    if (!this.apikey) throw new Error('FMP_API_KEY is not set');

    const cacheKey = `fmp:historical:${symbol}`;
    const cached = await getCache<OHLC[]>(cacheKey);

    if (cached) return cached;

    try {
      const now = new Date();
      const from = format(subYears(new Date(), 1), 'yyyy-MM-dd');
      const to = format(now, 'yyyy-MM-dd');

      const url = `${this.base_url}/historical-price-eod/full`;

      const { data } = await axios.get(url, {
        params: {
          symbol: symbol,
          from: from,
          to: to,
          apikey: this.apikey,
        },
      });

      await setCache(cacheKey, data, 300);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data from Financial Modeling Prep API');
    }
  }

  public async getProfile(symbol: string): Promise<CompanyProfile> {
    if (!this.apikey) throw new Error('FMP_API_KEY is not set');

    const cacheKey = `fmp:profile:${symbol}`;
    const cached = await getCache<CompanyProfile>(cacheKey);

    if (cached) return cached;

    try {
      const url = `${this.base_url}/profile`;

      const response = await axios.get(url, {
        params: {
          symbol: symbol,
          apikey: this.apikey,
        },
      });

      const data = response.data[0]

      await setCache(cacheKey, data, 86400);

      return {
        symbol: data.symbol,
        marketCap: data.marketCap,
        companyName: data.companyName,
        description: data.description,
        exchange: data.exchange,
        sector: data.sector,
        ceo: data.ceo,
        employees: data.fullTimeEmployees,
        industry: data.industry,
        website: data.website,
        address: data.address,
        country: data.country,
        city: data.city,
        state: data.state,
        zip: data.zip,
        ipoDate: data.ipoDate
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data from Financial Modeling Prep API');
    }
  }
}

export const isRetrievableByFMP = (symbol: string): boolean => {
  const availableSymbols = [
    "AAPL", "TSLA", "AMZN", "MSFT", "NVDA", "GOOGL", "META", "NFLX", "JPM", "V",
    "BAC", "AMD", "PYPL", "DIS", "T", "PFE", "COST", "INTC", "KO", "TGT",
    "NKE", "SPY", "BA", "BABA", "XOM", "WMT", "GE", "CSCO", "VZ", "JNJ",
    "CVX", "PLTR", "SQ", "SHOP", "SBUX", "SOFI", "HOOD", "RBLX", "SNAP", "AMD",
    "UBER", "FDX", "ABBV", "ETSY", "MRNA", "LMT", "GM", "F", "RIVN", "LCID",
    "CCL", "DAL", "UAL", "AAL", "TSM", "SONY", "ET", "NOK", "MRO", "COIN",
    "RIVN", "SIRI", "SOFI", "RIOT", "CPRX", "PYPL", "TGT", "VWO", "SPYG", "NOK",
    "ROKU", "HOOD", "VIAC", "ATVI", "BIDU", "DOCU", "ZM", "PINS", "TLRY", "WBA",
    "VIAC", "MGM", "NFLX", "NIO", "C", "GS", "WFC", "ADBE", "PEP", "UNH",
    "CARR", "FUBO", "HCA", "TWTR", "BILI", "SIRI", "VIAC", "FUBO", "RKT"
  ]

  return availableSymbols.includes(symbol.toUpperCase());
};
