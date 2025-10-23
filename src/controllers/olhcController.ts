import { Controller, Get, Route, Path, Tags } from 'tsoa';
import { OhlcService } from '../services/ohlcService';
import { OHLCResponse } from '../types/ohlc';

@Route('stocks/{symbol}/ohlc')
@Tags('Stocks')
export class OhlcController extends Controller {
  private service = new OhlcService();

  @Get()
  public async getOhlc(@Path() symbol: string): Promise<OHLCResponse> {
    return this.service.getOhlcData(symbol);
  }
}
