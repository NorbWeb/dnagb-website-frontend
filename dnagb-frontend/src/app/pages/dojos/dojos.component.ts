import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  inject,
  viewChild,
  signal,
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
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dojos',
  imports: [SafeHtmlPipe],
  templateUrl: './dojos.component.html',
  styleUrl: './dojos.component.css',
})
export class DojosComponent implements OnInit, OnDestroy {
  protected state = inject(StateService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  unsubscribeAll = new Subject();

  map: Map | undefined;
  url = environment.cmsUrl;
  allDojos = signal<any>([]);
  dojoInfo = signal<DojoInfo>({
    name: '',
    city: '',
    link: '',
    description: '',
    logo: '',
  });
  popup = new Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 18,
    className: 'dojo-popup',
    maxWidth: '10rem',
  });
  private justClosedDialog = false;
  dojoDialog = viewChild<ElementRef<HTMLDialogElement>>('dojoDialog');
  protected isLoading = signal<boolean>(true);

  closeDialog() {
    this.justClosedDialog = true;
    this.dojoDialog()?.nativeElement.close();
    this.dojoInfo.set({
      name: '',
      city: '',
      link: '',
      description: '',
      logo: '',
    });
    setTimeout(() => {
      this.justClosedDialog = false;
    }, 250);
  }

  initMap() {
    this.map = new Map({
      container: 'map',
      style:
        'https://sgx.geodatenzentrum.de/gdz_basemapworld_vektor/styles/bm_web_wld_col.json',

      center: [10.415, 51.356],
      zoom: 5.3,
      maxZoom: 10,
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
          el.tabIndex = 0;
          el.setAttribute('role', 'button');
          el.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            this.setDojoInfo(dojo, 'geojson');
            console.log(this.dojoInfo);

            this.dojoDialog()?.nativeElement.show();
            const dialog = this.dojoDialog();
            if (dialog && dialog.nativeElement.children[1]) {
              (dialog.nativeElement.children[1] as HTMLElement).scrollTop = 0;
            }
          });

          el.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
              e.stopPropagation();
              if (this.justClosedDialog) {
                // Ignore if dialog was just closed
                return;
              }
              this.setDojoInfo(dojo, 'geojson');
              this.dojoDialog()?.nativeElement.show();
            }
          });

          if (this.map) {
            new Marker({ element: el })
              .setLngLat(dojo.geometry.coordinates)
              .addTo(this.map);
          }
        }
      }

      this.map?.on('sourcedataloading', (e) => {
        if (!e.isSourceLoaded && e.sourceId === 'dojo-source') {
          this.map?.on('idle', () => {
            this.isLoading.set(false);
          });
        }
      });
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
    this.dojoInfo.set({
      name: '',
      city: '',
      link: '',
      description: '',
      logo: '',
    });

    if (type === 'geojson') {
      this.dojoInfo.set({
        name: dojo.properties.name,
        city: dojo.properties.city,
        link: dojo.properties.link,
        description: dojo.properties.description,
        logo: dojo.properties.logo,
      });
    }

    if (type === 'object') {
      this.dojoInfo.set({
        name: dojo.name,
        city: dojo.city,
        link: dojo.link,
        description: dojo.description,
        logo: dojo.logo,
      });
    }
  }

  ngOnInit(): void {
    this.initMap();
    this.allDojos.set(this.state.getConf().dojos);

    this.route.data.pipe(takeUntil(this.unsubscribeAll)).subscribe({
      next: (res) => {
        this.titleService.setTitle(
          res['title'] + ` · ${this.state.getConf().appSettings.title.short}`
        );
        if (!res) {
          return;
        }
      },
    });
  }

  ngOnDestroy() {
    this.map?.remove();
    this.unsubscribeAll.next(undefined);
    this.unsubscribeAll.complete();
  }
}
