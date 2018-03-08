import { Component, Input } from '@angular/core';
import { Article } from '../../data/article';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {

    defaultImage: String =
      'https://res.cloudinary.com/irfan-maulana/image/fetch/c_fill,g_auto:face,h_120,w_120,fl_force_strip.progressive/f_webp/https://angular-id-rssfeed.firebaseapp.com/assets/launcher-icon-3x.jpg';

      // props required
    @Input() isFullContent: Boolean = false;
    @Input() article: Article = null;

}
