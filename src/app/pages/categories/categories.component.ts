import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../../data/article';

import { ArticleService } from '../../services/article-service';

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
    private service: ArticleService
  ){}

  ngOnInit () {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId')
    this.loadArticlesByCategory()
  }

  loadArticlesByCategory () {
    this.articles = this.service.getArticlesByCategory(this.categoryId)
  }

  trackBySlug (index:number, article:Article) {
    return article.slug
  }
}
