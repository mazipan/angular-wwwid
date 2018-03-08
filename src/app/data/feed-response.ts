import { Feed } from '../data/feed';
import { Article } from '../data/article';

export class FeedResponse {
  constructor(
    public status: string,
    public feed: Feed,
    public items: Array<Article>
  ) { }
}
