import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../../data/article';

import { ArticleService } from '../../services/article-service';
import { RouteService } from '../../services/route-service';

@Component({
  selector: 'post-page',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostPage implements OnInit {

  article: Article;

  constructor (
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private routeService: RouteService
  ){}

  ngOnInit () {
    this.routeService.setIsHome(false)
    this.loadArticleDetail()
  }

  loadArticleDetail () {
    let slug = this.route.snapshot.paramMap.get('slug')
    this.article = this.articleService.getArticleBySlug(slug)
  }

}
