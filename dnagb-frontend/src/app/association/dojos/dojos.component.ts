import { Component, OnInit, OnDestroy } from '@angular/core';
import { Map, NavigationControl } from 'maplibre-gl';

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
      center: [10.447683, 51.163361],
      zoom: 5.35,
    });

    this.map.addControl(new NavigationControl({}), 'top-right');
  }

  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
