import { Controller, Get, Route, Path, Tags, Res, TsoaResponse, Security } from 'tsoa';
import { FMPService } from '../services/fmpService';
import { MassiveService } from '../services/massiveService';
import { NewsArticleResponse } from '../types/newsArticle';

@Route('stocks')
@Tags('Stocks')
export class newsArticleController extends Controller {
  private fmp = new FMPService();
  private massive = new MassiveService();

  @Get('/news')
  public async getArticles(
    @Res() notFound: TsoaResponse<404, { error: string }>
  ): Promise<NewsArticleResponse> {
    const newsArticles = await this.fmp.getArticles();

    return {
      articles: newsArticles,
      source: 'FMP'
    };
  }

  @Get('/{ticker}/news')
  @Security("jwt")
  public async getNews(
    @Path() ticker: string,
    @Res() notFound: TsoaResponse<404, { error: string }>
  ): Promise<NewsArticleResponse> {
    const newsArticles = await this.massive.getNews(ticker);
    if (!newsArticles) return notFound(404, { error: `Ticker symbol ${ticker} was not found.` });

    return {
      articles: newsArticles,
      source: 'Massive'
    };
  }
}
