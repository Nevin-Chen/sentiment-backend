import { Controller, Get, Route, Path, Tags } from 'tsoa';
import { FMPService } from './fmpService';
import { OHLCResponse, CompanyProfile } from './fmp';

@Route('stocks')
@Tags('Stocks')
export class FMPController extends Controller {
  private service = new FMPService();

  @Get('{ticker}/historical')
  public async getHistoricalData(
    @Path() ticker: string
  ): Promise<OHLCResponse> {
    return this.service.getHistoricalData(ticker);
  }

  @Get('{ticker}/profile')
  public async getProfile(
    @Path() ticker: string
  ): Promise<CompanyProfile> {
    return this.service.getProfile(ticker);
  }
}
