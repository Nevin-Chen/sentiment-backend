import axios from 'axios';
import { PolygonResponse } from './polygon';

export class PolygonService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.POLYGON_API_KEY || '';
  }

  public async getAggs(ticker: string, from: string, to: string): Promise<PolygonResponse> {
    if (!this.apiKey) throw new Error('POLYGON_API_KEY not set');

    try {
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
