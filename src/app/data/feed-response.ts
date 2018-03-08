import { Feed } from './feed';
import { Article } from './article';

export class FeedResponse {
  constructor(
    public status: string,
    public feed: Feed,
    public items: Array<Article>
  ) { }
}
