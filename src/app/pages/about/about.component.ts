import { Component, OnInit } from '@angular/core';

import { RouteService } from '../../services/route-service';

@Component({
  selector: 'about-page',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutPage implements OnInit {

  constructor (
    private routeService: RouteService
  ){}

  ngOnInit () {
    this.routeService.setIsHome(false)
  }

}
