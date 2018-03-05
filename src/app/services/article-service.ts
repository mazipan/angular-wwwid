import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs/Rx'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
// import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

// Import RxJs required methods
import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/catch'

import { Article }    from '../data/article';
import { ArticleCache } from '../data/article-cache';
import { FeedResponse } from '../data/feed-response';

const CACHE_KEY = 'NGWWWID'
const REGEX_FIRST_PARAGRAPH = /<p>.*.<\/p>\n</g
const API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid'

@Injectable()
export class ArticleService {
  articles: Article[] = []

  constructor(private http: HttpClient) {}

  getObservableArticles() : Observable<FeedResponse> {
    const self = this
    return this.http.get(API_URL)
      .map((response: FeedResponse) => {
        response.items = response.items.map((item: Article) => {
          let b = item.link.split('/')
          let slug = b[b.length-1]

          let a = item.content.match(REGEX_FIRST_PARAGRAPH)
          let contentView = a[0].slice(0, -1)
                                  .replace('<p>', '<span>')
                                  .replace('</p>', '</span>')

          let article = <Article>({
            title: item.title,
            link: item.link,
            slug: slug,
            author: item.author,
            pubDate: item.pubDate.slice(0, 10),
            compressedImg: `https://res.cloudinary.com/irfan-maulana/image/fetch/c_fill,g_auto:face,h_120,w_120,fl_force_strip.progressive/f_webp/${item.thumbnail}`,
            thumbnail: item.thumbnail,
            content: item.content,
            contentView: contentView,
            categories: item.categories
          });
          return article
        })
        // set to articles local
        this.setArticles(response.items);
        return response
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  getArticles() : Article[] {
    if (this.articles.length <= 0) {
      // get from cache first
      let cache = localStorage.getItem(CACHE_KEY)
      if (cache) {
        let cacheParse: ArticleCache = JSON.parse(cache)
        let dayNow = new Date().getDay();
        let dayCache = new Date(cacheParse.created).getDay();
        if (dayNow === dayCache) {
          return cacheParse.data;
        }
        return []
      } else {
        return []
      }
    }
    return this.articles
  }

  setArticles(param: Article[]) {
    let data = <ArticleCache>({
      created: Date.now(),
      data: param
    })
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))

    this.articles = param
  }

  getArticleBySlug(slug: string) : Article {
    return this.getArticles().filter((item: Article) => {
      return item.slug.indexOf(slug) >= 0
    })[0]
  }

  getArticlesByCategory(category: string) : Article[] {
    return this.getArticles().filter((item: Article) => {
      return item.categories.includes(category)
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
