import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RouteService {
  isHome: boolean = true;
  isHomeSubject: Subject<boolean> = new Subject<boolean>();

  constructor()  {
    this.isHomeSubject.subscribe((value: boolean) => {
      this.isHome = value;
    });
  }

  setIsHome (param: boolean) {
    this.isHomeSubject.next(param);
  }

}
