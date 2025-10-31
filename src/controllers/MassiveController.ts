import { Controller, Get, Route, Path, Tags } from 'tsoa';
import { MassiveService } from '../services/massiveService';
import { MassiveNewsResponse } from '../types/massive';

@Route('stocks')
@Tags('Stocks')
export class MassiveController extends Controller {
  private service = new MassiveService();

  @Get('{ticker}/news')
  public async getNews(@Path() ticker: string): Promise<MassiveNewsResponse> {
    return this.service.getNews(ticker);
  }
}
