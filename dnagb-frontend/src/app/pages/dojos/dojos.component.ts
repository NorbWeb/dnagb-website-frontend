import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AttributionControl,
  LngLatLike,
  Map,
  Marker,
  NavigationControl,
  Popup,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { StateService } from '../../0_global-services/state.service';
import { environment } from '../../../environment/env';
import { ZoomToExtendControl } from './zoomToExtend';
import { DojoInfo } from './dojoInterfaces';
import { covertToGeoJson } from './covertToGeoJson';

@Component({
    selector: 'app-dojos',
    imports: [],
    templateUrl: './dojos.component.html',
    styleUrl: './dojos.component.css'
})
export class DojosComponent implements OnInit, OnDestroy {
  map: Map | undefined;
  url = environment.cmsUrl;
  allDojos!: any;
  dojoInfo: DojoInfo = {
    name: '',
    city: '',
    link: '',
    description: '',
    logo: '',
  };
  showInfo: boolean = false;
  popup = new Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 23,
    className: 'dojo-popup',
    maxWidth: '10rem',
  });

  constructor(private state: StateService) {}

  closeInfo() {
    this.showInfo = false;
    // this.map?.easeTo({
    //   center: [10.415, 51.356],
    //   zoom: 5.3,
    //   duration: 750,
    // });
  }

  initMap() {
    this.map = new Map({
      container: 'map',
      style:
        'https://sgx.geodatenzentrum.de/gdz_basemapworld_vektor/styles/bm_web_wld_col.json',

      center: [10.415, 51.356],
      zoom: 5.3,
      maxZoom: 10,
      minZoom: 4.5,
      attributionControl: false,
    });

    this.map.addControl(new NavigationControl({}), 'top-right');
    this.map.addControl(
      new AttributionControl({
        compact: true,
      })
    );
    this.map.addControl(new ZoomToExtendControl());

    this.map.dragRotate.disable();
    this.map.touchZoomRotate.disableRotation();

    // this.map.on('move', () => {
    //   console.log(this.map?.getZoom());
    // });

    // this.map.on('load', () => {
    //   this.map?.addSource('world-source', {
    //     type: 'raster',
    //     tiles: [
    //       ' https://sgx.geodatenzentrum.de/web_public/gdz/datenquellen/Datenquellen_TopPlusOpen.html',
    //     ],
    //     tileSize: 256,
    //   });
    //   this.map?.addLayer({
    //     id: 'world-layer',
    //     type: 'raster',
    //     source: 'world-source',
    //     paint: {},
    //   });
    // });

    this.map.on('load', async () => {
      let dojos: any = covertToGeoJson(this.state.getConf().dojos);

      this.map?.addSource('dojo-source', {
        type: 'geojson',
        data: dojos,
      });

      this.map?.addLayer({
        id: 'dojos',
        type: 'circle',
        source: 'dojo-source',
        paint: {
          'circle-radius': 20,
          'circle-opacity': 0,
        },
      });

      for (const dojo of dojos.features) {
        if (dojo.properties.status === 'published') {
          const el = document.createElement('div');
          el.className = 'dojo-marker';
          el.style.backgroundImage = `url(${this.url}/assets/${dojo.properties.logo})`;
          el.addEventListener('click', () => {
            this.setDojoInfo(dojo, 'geojson');
          });

          if (this.map) {
            new Marker({ element: el })
              .setLngLat(dojo.geometry.coordinates)
              .addTo(this.map);
          }
        }
      }
    });

    this.map.on('mouseenter', 'dojos', (e: any) => {
      this.popup.remove();

      if (!this.map) return;

      const coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      let html = `
      <div>${e.features[0].properties.name}</div>
      `;

      this.popup.setLngLat(coordinates).setHTML(html).addTo(this.map);
    });

    this.map.on('mouseleave', 'dojos', () => {
      if (!this.map) return;
      this.popup.remove();
    });
  }

  easeToPoint(centerArr: LngLatLike) {
    this.map?.flyTo({
      center: centerArr,
      zoom: 8.5,
      duration: 2000,
    });
  }

  setDojoInfo(dojo: any, type: 'geojson' | 'object') {
    this.showInfo = true;
    // this.map?.easeTo({
    //   center: dojo.geometry.coordinates,
    //   zoom: 8.5,
    //   duration: 750,
    // });
    this.dojoInfo = {
      name: '',
      city: '',
      link: '',
      description: '',
      logo: '',
    };

    if (type === 'geojson') {
      this.dojoInfo.name = dojo.properties.name;
      this.dojoInfo.city = dojo.properties.city;
      this.dojoInfo.link = dojo.properties.link;
      this.dojoInfo.description = dojo.properties.description;
      this.dojoInfo.logo = dojo.properties.logo;
    }

    if (type === 'object') {
      this.dojoInfo.name = dojo.name;
      this.dojoInfo.city = dojo.city;
      this.dojoInfo.link = dojo.link;
      this.dojoInfo.description = dojo.description;
      this.dojoInfo.logo = dojo.logo;
    }
  }

  listItemClick(dojo: any) {
    this.easeToPoint(dojo.geometry.coordinates);
    this.setDojoInfo(dojo, 'object');
  }

  ngOnInit(): void {
    this.initMap();
    this.allDojos = this.state.getConf().dojos;
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
