import axios from 'axios';
import { PolygonResponse } from './polygon';
import { format } from 'date-fns'
export class PolygonService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.POLYGON_API_KEY || '';
  }

  public async getAggs(ticker: string): Promise<PolygonResponse> {
    if (!this.apiKey) throw new Error('POLYGON_API_KEY not set');

    try {
      const now = new Date();
      const to = format(now, 'yyyy-MM-dd');
      const from = format(new Date(now.setFullYear(now.getFullYear() - 5)), 'yyyy-MM-dd');

      const url = `https://api.polygon.io/v2/aggs/ticker/${encodeURIComponent(ticker)}/range/1/day/${from}/${to}`;

      const response = await axios.get(url, {
        params: {
          adjusted: true,
          sort: 'asc',
          apiKey: this.apiKey,
        },
      });

      return response.data as PolygonResponse;
    } catch (error) {
      throw new Error('Failed to fetch data from Polygon API');
    }
  }
}
