import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';

@Injectable()
export class RouteService {
  isHome: boolean = true
  isHomeSubject: Subject<boolean> = new Subject<boolean>();

  constructor()  {
    this.isHomeSubject.subscribe((value) => {
      this.isHome = value
    });
  }

  setIsHome (param: boolean) {
    this.isHomeSubject.next(param);
  }

}
