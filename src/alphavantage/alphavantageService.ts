import axios from 'axios';
import { CompanyOverview } from './alphavantage';

export class AlphaVantageService {
  private apiKey = process.env.ALPHAVANTAGE_API_KEY || '';
  private base_url = 'https://www.alphavantage.co/query';

  public async getOverview(ticker: string): Promise<CompanyOverview> {
    if (!this.apiKey) throw new Error('ALPHAVANTAGE_API_KEY is not set');

    try {
      const { data } = await axios.get(this.base_url, {
        params: {
          function: 'OVERVIEW',
          symbol: ticker,
          apikey: this.apiKey,
        },
      });

      return {
        symbol: data.Symbol,
        name: data.Name,
        description: data.Description,
        exchange: data.Exchange,
        sector: data.Sector,
        industry: data.Industry,
        country: data.Country,
        website: data.OfficialSite,

        marketCap: Number(data.MarketCapitalization),
        peRatio: Number(data.PERatio),
        eps: Number(data.EPS),
        dividendYield: Number(data.DividendYield),
        analystTargetPrice: Number(data.AnalystTargetPrice),

        week52High: Number(data["52WeekHigh"]),
        week52Low: Number(data["52WeekLow"]),
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data from AlphaVantage API');
    }
  }
}
