import { Component, Input } from '@angular/core';
import { Article } from '../../data/article';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {

    defaultImage = 'assets/launcher-icon-3x.jpg';
    // props required
    @Input() isFullContent: boolean = false;
    @Input() article: Article = null;

}
