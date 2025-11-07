import { Controller, Get, Route, Path, Tags, Res, TsoaResponse, Security } from 'tsoa';
import { OhlcService } from '../services/ohlcService';
import { OHLCResponse } from '../types/ohlc';

@Route('stocks/{symbol}/ohlc')
@Tags('Stocks')
export class OhlcController extends Controller {
  private service = new OhlcService();

  @Get()
  @Security("jwt")
  public async getOhlc(
    @Path() symbol: string,
    @Res() notFound: TsoaResponse<404, { error: string }>
  ): Promise<OHLCResponse> {
    const ohlcData = await this.service.getOhlcData(symbol);
    if (!ohlcData) return notFound(404, { error: `Ticker symbol ${symbol} was not found.` });
    return ohlcData
  }
}
