import { Component, OnInit } from '@angular/core';

import { Article }    from '../../data/article';
import { FeedResponse } from '../../data/feed-response';

import { ArticleService } from '../../services/article-service';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomePage implements OnInit {
  articles: Article[] = [<Article>({})]

  constructor (
    private service: ArticleService
  ){}

  ngOnInit () {
    this.loadArticles()
  }

  loadArticles () {
    const _self = this
    const REGEX_FIRST_PARAGRAPH = /<p>.*.<\/p>\n</g
    _self.service.getObservableArticles()
      .subscribe(
        (data: FeedResponse) => {
          _self.articles = [];
          data.items.map((item: Article) => {
            _self.articles.push(item);
          })
        },
        err => {
          console.log(err)
          _self.articles = [];
        })
  }

  trackBySlug (index:number, article:Article) {
    return article.slug
  }
}
