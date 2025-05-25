import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
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
import { SafeHtmlPipe } from '../../2_pipes/safeHtml';

@Component({
  selector: 'app-dojos',
  imports: [SafeHtmlPipe],
  templateUrl: './dojos.component.html',
  styleUrl: './dojos.component.css',
})
export class DojosComponent implements OnInit, OnDestroy {
  state = inject(StateService);
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
  popup = new Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 18,
    className: 'dojo-popup',
    maxWidth: '10rem',
  });

  @ViewChild('dojoDialog') dojoDialog!: ElementRef<HTMLElement>;

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
          this.setDojoInfo(dojo, 'geojson');

          const el = document.createElement('div');
          el.className = 'dojo-marker';
          el.addEventListener('click', () => {
            this.setDojoInfo(dojo, 'geojson');

            this.dojoDialog.nativeElement.setAttribute('open', '');
            this.dojoDialog.nativeElement.setAttribute('title', dojo.name);
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

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      let html = `<div>${e.features[0].properties.name} | ${e.features[0].properties.city}</div>`;

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
    // this.showInfo = true;
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

  ngOnInit(): void {
    this.initMap();
    this.allDojos = this.state.getConf().dojos;
    this.setDojoInfo(this.allDojos[0], 'geojson');
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
