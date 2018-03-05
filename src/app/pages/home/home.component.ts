import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx'

import { Article }    from '../../data/article';
import { FeedResponse } from '../../data/feed-response';

import { ArticleService } from '../../services/article-service';
import { RouteService } from '../../services/route-service';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomePage implements OnInit {
  articles: Article[] = [<Article>({})]

  constructor (
    private articleService: ArticleService,
    private routeService: RouteService
  ){}

  ngOnInit () {
    this.routeService.setIsHome(true)
    this.loadArticles()
  }

  loadArticles () {
    const _self = this
    // read from cache first
    let cache: Article[] = _self.articleService.getArticles();
    if (cache.length <= 0) {
      _self.articleService.getObservableArticles()
        .subscribe((data: FeedResponse) => {
            _self.articles = [];
            data.items.map((item: Article) => {
              _self.articles.push(item);
            })
          },
          err => {
            console.log(err)
            _self.articles = [];
          }
        )
    } else {
      _self.articles = cache;
    }
  }

  trackBySlug (index:number, article:Article) {
    return article.slug
  }
}
