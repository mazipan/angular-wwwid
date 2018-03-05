import { Article } from "./article";

export class ArticleCache {
  constructor(
    public created: number,
    public data: Array<Article>
  ) { }
}
