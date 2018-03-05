import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../../data/article';

import { ArticleService } from '../../services/article-service';
import { RouteService } from '../../services/route-service';

@Component({
  selector: 'categories-page',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesPage implements OnInit {
  articles: Article[] = [<Article>({})]
  categoryId: string = '';

  constructor (
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private routeService: RouteService
  ){}

  ngOnInit () {
    this.routeService.setIsHome(false)
    this.categoryId = this.route.snapshot.paramMap.get('categoryId')
    this.loadArticlesByCategory()
  }

  loadArticlesByCategory () {
    this.articles = this.articleService.getArticlesByCategory(this.categoryId)
  }

  trackBySlug (index:number, article:Article) {
    return article.slug
  }
}
