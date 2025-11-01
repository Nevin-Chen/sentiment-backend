import { FMPArticle } from "../types/fmp";
import { MassiveNewsArticle } from "../types/massive";
import { NewsArticle } from "../types/newsArticle";
import { DateUtils } from "../utils/dateUtils";

export class NewsArticleNormalizer {
  static fromFMP(article: FMPArticle): NewsArticle {
    return {
      title: article.title,
      date: DateUtils.normalizeToUTC(article.date),
      content: article.content,
      tickers: article.tickers,
      image: article.image,
      link: article.link
    };
  }

  static fromMassive(article: MassiveNewsArticle): NewsArticle {
    return {
      title: article.title,
      date: DateUtils.normalizeToUTC(article.published_utc),
      content: article.description,
      image: article.publisher.logo_url,
      link: article.article_url
    };
  }
}
