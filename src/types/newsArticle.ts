export interface NewsArticle {
  title: string;
  date: string;
  content: string;
  tickers?: string;
  image?: string;
  link: string;
}

export interface NewsArticleResponse {
  articles: NewsArticle[];
  source: "FMP" | "Massive";
}
