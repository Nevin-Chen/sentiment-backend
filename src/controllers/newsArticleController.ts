import { Controller, Get, Route, Path, Tags } from 'tsoa';
import { FMPService } from '../services/fmpService';
import { MassiveService } from '../services/massiveService';
import { NewsArticleResponse } from '../types/newsArticle';

@Route('stocks')
@Tags('Stocks')
export class newsArticleController extends Controller {
  private fmp = new FMPService();
  private massive = new MassiveService();

  @Get('/news')
  public async getArticles(): Promise<NewsArticleResponse> {
    const newsArticles = await this.fmp.getArticles();

    return {
      articles: newsArticles,
      source: 'FMP'
    };
  }

  @Get('/{ticker}/news')
  public async getNews(@Path() ticker: string): Promise<NewsArticleResponse> {
    const newsArticles = await this.massive.getNews(ticker);
    return {
      articles: newsArticles,
      source: 'Massive'
    };
  }
}
