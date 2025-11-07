import { Controller, Get, Route, Path, Tags, Res, TsoaResponse, Security } from 'tsoa';
import { FMPService } from '../services/fmpService';
import { CompanyProfile } from '../types/fmp';

@Route('stocks')
@Tags('Stocks')
export class FMPController extends Controller {
  private service = new FMPService();

  @Get('{symbol}/profile')
  @Security("jwt")
  public async getProfile(
    @Path() symbol: string,
    @Res() notFound: TsoaResponse<404, { error: string }>
  ): Promise<CompanyProfile> {
    const data = this.service.getProfile(symbol);
    if (!data) return notFound(404, { error: `Ticker symbol ${symbol} was not found.` });
    return data;
  }
}
