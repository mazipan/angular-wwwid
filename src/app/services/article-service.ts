import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Article }    from '../data/article'
import { Observable } from 'rxjs/Rx'
import { map } from 'rxjs/operators';

// Import RxJs required methods
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

const API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid'

@Injectable()
export class ArticleService {
  articles: Article[] = [<Article>({})]

  constructor(private http: HttpClient) {}

  getObservableArticles() : Observable<HttpResponse<any>> {
    const self = this
    return this.http.get(API_URL)
      .pipe(
        catchError(this.handleError)
      )
  }

  getArticles() : Article[] {
    return this.articles
  }

  setArticles(param: Article[]) {
    this.articles = param
  }

  getArticleBySlug(slug: string) : Article {
    return this.articles.filter((item: Article) => {
      return item.slug.indexOf(slug) >= 0
    })[0]
  }

  getArticlesByCategory(category: string) : Article[] {
    return this.articles.filter((item: Article) => {
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
