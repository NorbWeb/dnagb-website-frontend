import { Component, OnInit, OnDestroy } from '@angular/core';
import { Map, NavigationControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-dojos',
  standalone: true,
  imports: [],
  templateUrl: './dojos.component.html',
  styleUrl: './dojos.component.css',
})
export class DojosComponent implements OnInit, OnDestroy {
  map: Map | undefined;

  initMap() {
    this.map = new Map({
      container: 'map',
      style:
        'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_col.json',
      center: [10.415, 51.356],
      zoom: 5.3,
    });

    this.map.addControl(new NavigationControl({}), 'top-left');

    this.map.on('move', () => {
      console.log(this.map?.getZoom());
    });

    // this.map.on('load', () => {
    //   this.map?.addSource('background-source', {
    //     type: 'raster',
    //     tiles: [
    //       'https://sgx.geodatenzentrum.de/wms_topplus_open?bbox=939258.2035682462,7200979.560689885,1252344.271424327,7514065.628545966&service=WMS&version=1.1.0&request=GetMap&layers=web_light_grau&styles=&srs=EPSG:3857&width=256&height=256&format=image/png&transparent=true',
    //     ],
    //     tileSize: 256,
    //   });
    //   this.map?.addLayer({
    //     id: 'background-layer',
    //     type: 'raster',
    //     source: 'background-source',
    //     paint: {},
    //   });
    // });
  }

  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
