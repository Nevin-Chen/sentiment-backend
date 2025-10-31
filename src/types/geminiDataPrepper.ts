export type CompressedOhlcRow = [string, number, number, number, number, number];

export interface HybridOhlcData {
  symbol: string;
  recentDaily: CompressedOhlcRow[];
  olderWeekly: CompressedOhlcRow[];
}
