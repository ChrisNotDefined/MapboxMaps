import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        height: 100%;
        width: 100%;
      }

      .row {
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        z-index: 999;
        position: fixed;
      }
    `,
  ],
})
// export class ZoomRangeComponent implements OnInit {
export class ZoomRangeComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor() {
    console.log('constructor', this.divMapa);
  }

  // ngOnInit(): void {
  ngAfterViewInit(): void {
    console.log('FullScreen Component');
    console.log('afterViewInit', this.divMapa);

    // (mapboxgl as any).accessToken = environment.mapBoxToken;
    // var map = new mapboxgl.Map({
    this.mapa = new mapboxgl.Map({
      // container: 'mapa',
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-101.71139903359004, 21.152214114210125],
      zoom: this.zoomLevel,
    });

    this.mapa.on('zoomend', () => {
      this.zoomLevel = this.mapa.getZoom();
    })
  }

  zoomIn() {
    console.log('Zoom In');
    this.mapa.zoomIn();
    
  }

  zoomOut() {
    console.log('Zoom Out');
    console.log('zoomOut', this.divMapa);
    this.mapa.zoomOut();
  }

  zoomChage(evt: any) {
    this.mapa.zoomTo(evt.target?.value);
  }

  zoomCenter() {
    this.mapa.zoomTo(11);
  }
}
