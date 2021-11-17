import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment.prod';


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [

    `
      #mapa{
        height: 100%;
        width:100%;
        
      }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    console.log('FullScreen Component');

    // (mapboxgl as any).accessToken = environment.mapBoxToken;
    var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11',

    center: [-101.69969835752303,21.119678157847517],
    zoom:15
    
});
  }

}
