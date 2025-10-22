import { Controller, Get, Route, Path, Tags } from 'tsoa';
import { AlphaVantageService } from './alphavantageService';
import { CompanyOverview } from './alphavantage';

@Route('stocks')
@Tags('Stocks')
export class AlphaVantageController extends Controller {
  private service = new AlphaVantageService();

  @Get('{ticker}/overview')
  public async getOverview(@Path() ticker: string): Promise<CompanyOverview> {
    return this.service.getOverview(ticker);
  }
}
