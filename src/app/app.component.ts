import { Component, AfterViewChecked } from '@angular/core';
import { RouteService } from './services/route-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewChecked{
  isHome: boolean = true

  constructor (
    private service: RouteService
  ){}

  ngAfterViewChecked() {
    this.service.isHomeSubject.subscribe(value => {
      this.isHome = value;
    });
  }
}
