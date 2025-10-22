import axios from 'axios';
import { OHLCResponse, CompanyProfile } from './fmp';
import { format, subYears } from 'date-fns'

export class FMPService {
  private apikey = process.env.FMP_API_KEY || '';
  private base_url = "https://financialmodelingprep.com/stable"

  public async getHistoricalData(ticker: string): Promise<OHLCResponse> {
    if (!this.apikey) throw new Error('FMP_API_KEY is not set');

    try {
      const now = new Date();
      const from = format(subYears(new Date(), 5), 'yyyy-MM-dd');
      const to = format(now, 'yyyy-MM-dd');

      const url = `${this.base_url}/historical-price-eod/full`;

      const { data } = await axios.get(url, {
        params: {
          symbol: ticker,
          from: from,
          to: to,
          apikey: this.apikey,
        },
      });

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data from Financial Modeling Prep API');
    }
  }

  public async getProfile(ticker: string): Promise<CompanyProfile> {
    if (!this.apikey) throw new Error('FMP_API_KEY is not set');

    try {
      const url = `${this.base_url}/profile`;

      const response = await axios.get(url, {
        params: {
          symbol: ticker,
          apikey: this.apikey,
        },
      });

      const data = response.data[0]

      return {
        symbol: data.symbol,
        marketCap: Number(data.mktCap),
        companyName: data.companyName,
        description: data.description,
        exchange: data.exchangeShortName,
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
