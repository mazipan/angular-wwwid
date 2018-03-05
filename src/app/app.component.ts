import { Component } from '@angular/core';
import { RouteService } from './services/route-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isHome: boolean = true

  constructor (private service: RouteService){
    this.service.isHomeSubject.subscribe(value => {
      this.isHome = value;
      console.log('changed', this.isHome)
    });
  }
}
