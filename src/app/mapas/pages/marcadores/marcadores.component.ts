import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        message: 'Foo',
        iconSize: [60, 60],
      },
      geometry: {
        type: 'Point',
        coordinates: [-99.911656, 16.83727],
      },
    },
    {
      type: 'Feature',
      properties: {
        message: 'Bar',
        iconSize: [50, 50],
      },
      geometry: {
        type: 'Point',
        coordinates: [-101.71139903359004, 21.152214114210125],
      },
    },
    {
      type: 'Feature',
      properties: {
        message: 'Baz',
        iconSize: [40, 40],
      },
      geometry: {
        type: 'Point',
        coordinates: [-99.061809, 19.439833],
      },
    },
  ],
};

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  @ViewChild('marker') markerTemplate!: TemplateRef<void>;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-101.71139903359004, 21.152214114210125];

  constructor() {}

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: 15,
    });

    geojson.features.map((feat) => {
      const elem = document.createElement('div');
      const [width, height] = feat.properties.iconSize;
      elem.className = 'map-marker';

      elem.style.borderRadius = '99em';
      elem.style.cursor = 'pointer';
      elem.style.width = `${width}px`;
      elem.style.height = `${height}px`;
      elem.style.backgroundImage = `url(https://picsum.photos/${width})`;
      elem.style.backgroundSize = '100%';

      elem.addEventListener('click', () => {
        window.alert(feat.properties.message);
      });

      new mapboxgl.Marker(elem)
        .setLngLat(feat.geometry.coordinates as mapboxgl.LngLatLike)
        .addTo(map);
    });
  }
}
