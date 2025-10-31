import { FMPService, isRetrievableByFMP } from './fmpService';
import { MassiveService } from './massiveService';
import { OHLCResponse, OHLC } from '../types/ohlc';
import { MassiveResponse } from '../types/massive';

export class OhlcService {
  private fmp = new FMPService();
  private massive = new MassiveService();

  private normalizeMassiveData(massiveResponse: MassiveResponse): OHLC[] {
    return massiveResponse.results.map(result => ({
      symbol: massiveResponse.ticker,
      date: new Date(result.t).toISOString().slice(0, 10),
      open: result.o,
      high: result.h,
      low: result.l,
      close: result.c,
      volume: result.v,
      change: result.c - result.o,
      changePercent: ((result.c - result.o) / result.o) * 100,
      vwap: result.vw
    }));
  }

  public async getOhlcData(symbol: string): Promise<OHLCResponse> {
    if (isRetrievableByFMP(symbol)) {
      const data = await new FMPService().getHistoricalData(symbol);
      return { data, source: 'FMP' };
    } else {
      const rawData = await new MassiveService().getAggs(symbol);
      const data = this.normalizeMassiveData(rawData)
      return { data, source: 'Massive' };
    }
  }
};
