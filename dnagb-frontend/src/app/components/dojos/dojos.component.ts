import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AttributionControl,
  Map,
  Marker,
  NavigationControl,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { StateService } from '../../0_global-services/state.service';
import { environment } from '../../../environment/env';
import { ZoomToExtendControl } from './zoomToExtend';

interface DojoInfo {
  name: string;
  city: string;
  link: string;
  description: string;
  logo: string;
}

@Component({
  selector: 'app-dojos',
  standalone: true,
  imports: [],
  templateUrl: './dojos.component.html',
  styleUrl: './dojos.component.css',
})
export class DojosComponent implements OnInit, OnDestroy {
  map: Map | undefined;
  url = environment.cmsUrl;
  dojoInfo: DojoInfo = {
    name: '',
    city: '',
    link: '',
    description: '',
    logo: '',
  };
  showInfo: boolean = false;

  constructor(private state: StateService) {}

  closeInfo() {
    this.showInfo = false;
  }

  initMap() {
    this.map = new Map({
      container: 'map',
      style:
        'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_col.json',
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

    const dojos = this.state.getConf().association.dojos;

    for (const dojo of dojos) {
      const el = document.createElement('div');
      el.className = 'dojo-marker';

      el.style.backgroundImage = `url(${this.url}/assets/${dojo.logo})`;
      el.style.width = `40px`;
      el.style.height = `40px`;
      el.style.borderRadius = '50%';
      el.style.border = '0.1rem solid var(--grey-500)';
      el.style.filter = 'drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))';
      el.style.backgroundColor = 'var(--white)';
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.cursor = 'pointer';

      el.addEventListener('click', () => {
        this.showInfo = true;
        this.dojoInfo = {
          name: '',
          city: '',
          link: '',
          description: '',
          logo: '',
        };

        if (dojo.status === 'published') {
          this.dojoInfo.name = dojo.name;
          this.dojoInfo.city = dojo.city;
          this.dojoInfo.link = dojo.link;
          this.dojoInfo.description = dojo.description;
          this.dojoInfo.logo = dojo.logo;
        }
      });
      new Marker({ element: el })
        .setLngLat(dojo.coordinates.coordinates)
        .addTo(this.map);
    }
  }
  onClick(): any {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
