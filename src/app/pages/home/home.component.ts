import { Component, OnInit } from '@angular/core';

import { Article }    from '../../data/article';
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
    let _self = this
    const REGEX_FIRST_PARAGRAPH = /<p>.*.<\/p>\n</g
    _self.service.getObservableArticles()
      .subscribe(
        data => {
          _self.articles = [];
          data['items'].map(item => {
            let b = item.link.split('/')
            let slug = b[b.length-1]

            let a = item.content.match(REGEX_FIRST_PARAGRAPH)
            let contentView = a[0].slice(0, -1)
                                    .replace('<p>', '<span>')
                                    .replace('</p>', '</span>')

            let article = <Article>({
              title: item.title,
              slug: slug,
              author: item.author,
              pubDate: item.pubDate.slice(0, 10),
              compressedImg: `https://res.cloudinary.com/irfan-maulana/image/fetch/c_fill,g_auto:face,h_120,w_120,fl_force_strip.progressive/f_webp/${item.thumbnail}`,
              thumbnail: item.thumbnail,
              content: item.content,
              contentView: contentView,
              categories: item.categories
            });
            _self.articles.push(article);
          })
          // set back to services
          _self.service.setArticles(_self.articles)
        },
        err => {
          console.log(err)
        })
  }

  trackBySlug (index:number, article:Article) {
    return article.slug
  }
}
