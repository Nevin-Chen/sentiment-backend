import axios from 'axios';
import { MassiveOhlcResponse, MassiveNewsResponse } from '../types/massive';
import { NewsArticle } from '../types/newsArticle';
import { format, subYears } from 'date-fns'
import { getCache, setCache } from "./redis";
import { NewsArticleNormalizer } from './newsArticleNormalizer';

export class MassiveService {
  private apiKey = process.env.MASSIVE_API_KEY || '';
  private base_url = "https://api.massive.com";

  public async getAggs(ticker: string): Promise<MassiveOhlcResponse | null> {
    if (!this.apiKey) throw new Error('MASSIVE_API_KEY is not set');

    const cacheKey = `massive:aggs:${ticker}`;
    const cached = await getCache<MassiveOhlcResponse>(cacheKey);

    if (cached) return cached;

    try {
      const now = new Date();
      const to = format(now, 'yyyy-MM-dd');
      const from = format(subYears(new Date(), 1), 'yyyy-MM-dd');

      const url = `${this.base_url}/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}`;

      const { data } = await axios.get(url, {
        params: {
          adjusted: true,
          sort: 'asc',
          apiKey: this.apiKey,
        },
      });

      if (data.resultsCount == 0) return null;

      await setCache(cacheKey, data, 3600);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch OHLC data from the Massive API');
    }
  }

  public async getNews(ticker: string): Promise<NewsArticle[] | null> {
    if (!this.apiKey) throw new Error('MASSIVE_API_KEY is not set');

    const cacheKey = `massive:news:${ticker}`;
    const cached = await getCache<NewsArticle[]>(cacheKey);

    if (cached) return cached;

    try {
      const url = `${this.base_url}/v2/reference/news`;

      const { data } = await axios.get<MassiveNewsResponse>(url, {
        params: {
          ticker: ticker.toUpperCase(),
          limit: 10,
          sort: "published_utc",
          order: 'desc',
          apiKey: this.apiKey,
        },
      });

      if (data.results.length === 0) return null;

      const normalizedArticles = data.results.map(NewsArticleNormalizer.fromMassive);
      await setCache(cacheKey, normalizedArticles, 3600);

      return normalizedArticles;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch news data from the Massive API');
    }
  }
}
