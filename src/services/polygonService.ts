import axios from 'axios';
import { PolygonResponse } from '../types/polygon';
import { format, subYears } from 'date-fns'

export class PolygonService {
  private apiKey = process.env.POLYGON_API_KEY || '';

  public async getAggs(ticker: string): Promise<PolygonResponse> {
    if (!this.apiKey) throw new Error('POLYGON_API_KEY is not set');

    try {
      const now = new Date();
      const to = format(now, 'yyyy-MM-dd');
      const from = format(subYears(new Date(), 1), 'yyyy-MM-dd');

      const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}`;

      const { data } = await axios.get(url, {
        params: {
          adjusted: true,
          sort: 'asc',
          apiKey: this.apiKey,
        },
      });

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data from Polygon API');
    }
  }
}
