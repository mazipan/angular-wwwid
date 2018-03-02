/**
 * Created by irfan.maulana on 1/8/2017.
 */
import { Injectable }     from '@angular/core'
import { Http, Response } from '@angular/http'
import { Article }    from '../data/article'
import { Observable } from 'rxjs/Rx'

// Import RxJs required methods
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

const API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid'
const REGEX_FIRST_PARAGRAPH = /<p>.*.<\/p>\n</g

@Injectable()
export class ArticleService {
  constructor (
    private http: Http,
  ) {}

  getArticles() : Observable<Article[]> {
    const self = this

    function convertResponse(r:any): Article{
      let b = r.link.split('/')
      let slug = b[b.length-1]

      let a = r.content.match(REGEX_FIRST_PARAGRAPH)
      let contentView = a[0].slice(0, -1)
                              .replace('<p>', '<span>')
                              .replace('</p>', '</span>')

      let article = <Article>({
        title: r.title,
        slug: slug,
        author: r.author,
        pubDate: r.pubDate.slice(0, 10),
        compressedImg: `https://res.cloudinary.com/irfan-maulana/image/fetch/c_fill,g_auto:face,h_120,w_120,fl_force_strip.progressive/f_webp/${r.thumbnail}`,
        thumbnail: r.thumbnail,
        content: r.content,
        contentView: contentView,
        categories: r.categories
      });

      return article;
    };

    function mapResponse(response:Response): Article[]{
      return response.json()
            .results.map(convertResponse)
    }

    // ...using get request
    return this.http.get(API_URL)
      // ...and calling .json() on the response to return data
      .map(mapResponse)
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))

  }

}
