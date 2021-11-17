import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [

    `
      .mapa-container{
        height: 100%;
        width:100%;
        
      }
      .row{
        background-color:white;
        border-radius:5px;
        bottom: 50px;
        left:50px;
        padding:10px;
        z-index:999;
        position:fixed;
        width:400px
      }
    `
  ]
})
// export class ZoomRangeComponent implements OnInit {
  export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!:mapboxgl.Map;
  zoomLevel: number = 10;
  center:[number,number] = [-101.71139903359004,21.152214114210125];

  constructor() { 
    console.log('constructor',this.divMapa)
  }
  ngOnDestroy(): void {
    this.mapa.off('zoom',()=>{});
    this.mapa.off('zoomend',()=>{});
    this.mapa.off('move',()=>{});
  }

  // ngOnInit(): void {
    ngAfterViewInit(): void {
        console.log('FullScreen Component');
        console.log('afterViewInit',this.divMapa)

    // (mapboxgl as any).accessToken = environment.mapBoxToken;
    // var map = new mapboxgl.Map({
    this.mapa = new mapboxgl.Map({
    // container: 'mapa',
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.center,
    zoom:this.zoomLevel
  });

  // Cuando el zoom cambia se usa un listener
  this.mapa.on('zoom',(event)=>{
    // console.log('zoom')
    // console.log(event);
    // const zoomActual = this.mapa.getZoom();
    // console.log(zoomActual);
    this.zoomLevel = this.mapa.getZoom(); //Obtener zoom actual
  });
  //Limitar zoom a 18
  this.mapa.on('zoomend',(event)=>{
    if(this.mapa.getZoom()>18){
      this.mapa.zoomTo(18);
    }
  });
  // Movimiento de mapa y posición central
  this.mapa.on('move',(event)=>{
    // console.log(event)
    const target = event.target;
    console.log(target.getCenter());
    const {lng, lat } = target.getCenter();
    this.center = [lng,lat];
  });
}
  zoomIn(){
    this.mapa.zoomIn()

  }
  zoomOut(){
    this.mapa.zoomOut()

  }

  zoomCambio(valor:string){
    //Para valores de range
    // console.log(valor) 
    this.mapa.zoomTo(Number(valor))
  }
}
