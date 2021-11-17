import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `.mapa-container{
        height: 100%;
        width:100%;
        
      }` 
  ]
})
export class MarcadoresComponent implements OnInit {

   
  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!:mapboxgl.Map;
  zoomLevel: number = 10;
  center:[number,number] = [-101.71139903359004,21.152214114210125];

  constructor() { }

  ngOnInit(): void {
  }

}
