export interface MassiveOhlcResponse {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: MassiveAggResult[];
  status: string;
  request_id: string;
  count: number;
}

export interface MassiveNewsResponse {
  results: MassiveNewsArticle[];
  status: string;
  request_id: string;
  count: number;
  next_url: string;
}

export interface MassiveAggResult {
  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
}

export interface MassiveNewsArticle {
  id: string;
  publisher: Publisher;
  title: string;
  author: string;
  published_utc: string;
  article_url: string;
  tickers: string[];
  image_url: string;
  description: string;
  keywords: string[];
}

interface Publisher {
  name: string;
  homepage_url: string;
  logo_url: string;
  favicon_url: string;
}
