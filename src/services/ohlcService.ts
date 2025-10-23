import { FMPService, isRetrievableByFMP } from './fmpService';
import { PolygonService } from './polygonService';
import { OHLCResponse, OHLC } from '../types/ohlc';
import { PolygonResponse } from '../types/polygon';

export class OhlcService {
  private fmp = new FMPService();
  private polygon = new PolygonService();

  private normalizePolygonData(polygonResponse: PolygonResponse): OHLC[] {
    return polygonResponse.results.map(result => ({
      symbol: polygonResponse.ticker,
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
      const rawData = await new PolygonService().getAggs(symbol);
      const data = this.normalizePolygonData(rawData)
      return { data, source: 'Polygon' };
    }
  }
};
