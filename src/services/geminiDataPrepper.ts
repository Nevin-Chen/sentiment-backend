import { CompressedOhlcRow, HybridOhlcData } from "../types/geminiDataPrepper";
import { OhlcService } from './ohlcService';
import { OHLC } from "../types/ohlc";

export class GeminiDataPrepper {
  private getDateMonthsAgo(months: number): Date {
    const d = new Date();
    d.setMonth(d.getMonth() - months);
    return d;
  }

  private compressOHLC(ohlcData: OHLC[]): CompressedOhlcRow[] {
    if (!ohlcData || ohlcData.length === 0) throw Error('No OHLC data to compress');

    const compressedData = ohlcData.map((item): CompressedOhlcRow => [
      item.date,
      Number(item.open.toFixed(2)),
      Number(item.high.toFixed(2)),
      Number(item.low.toFixed(2)),
      Number(item.close.toFixed(2)),
      Math.round(item.volume / 1000)
    ]);

    return compressedData;
  }

  private aggregateWeekly(data: CompressedOhlcRow[]): CompressedOhlcRow[] {
    if (!data.length) return [];

    data.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
    const result: CompressedOhlcRow[] = [];

    let weekStartDate = new Date(data[0][0]);
    let weekData: CompressedOhlcRow[] = [];

    const pushWeek = () => {
      if (!weekData.length) return;
      const open = weekData[0][1];
      const close = weekData[weekData.length - 1][4];
      const high = Math.max(...weekData.map(d => d[2]));
      const low = Math.min(...weekData.map(d => d[3]));
      const volume = weekData.reduce((sum, d) => sum + d[5], 0);

      result.push([
        weekStartDate.toISOString().split('T')[0],
        Number(open.toFixed(2)),
        Number(high.toFixed(2)),
        Number(low.toFixed(2)),
        Number(close.toFixed(2)),
        Math.round(volume)
      ]);

      weekData = [];
    };

    for (const row of data) {
      const date = new Date(row[0]);
      if (date.getTime() >= weekStartDate.getTime() + 7 * 24 * 60 * 60 * 1000) {
        pushWeek();
        weekStartDate = new Date(date);
      }
      weekData.push(row);
    }
    pushWeek();

    return result;
  }

  public async prepareHybridData(symbol: string): Promise<HybridOhlcData | null> {
    const response = await new OhlcService().getOhlcData(symbol);
    if (!response) return null;

    const compressedData = this.compressOHLC(response.data);
    const cutOffDate = this.getDateMonthsAgo(3);
    const olderData = compressedData.filter(d => new Date(d[0]) < cutOffDate);
    const recentData = compressedData.filter(d => new Date(d[0]) >= cutOffDate);
    const olderWeekly = this.aggregateWeekly(olderData);
    const recentDaily = recentData;

    return { symbol, recentDaily, olderWeekly };
  }
}
