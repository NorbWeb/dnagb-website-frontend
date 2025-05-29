import { Routes } from '@angular/router';

export let routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Home · DNagB',
  },
  {
    path: 'news',
    loadComponent: () =>
      import('./pages/news/event/event.component').then(
        (m) => m.EventComponent
      ),
    title: 'Aktuelles · DNagB',
  },
  {
    path: 'news/news-details/:id',
    loadComponent: () =>
      import('./pages/news/event-detail/event-detail.component').then(
        (m) => m.EventDetailComponent
      ),
    title: 'Details · DNagB',
  },
  {
    path: 'news/event-details/:id',
    loadComponent: () =>
      import('./pages/news/event-detail/event-detail.component').then(
        (m) => m.EventDetailComponent
      ),
    title: 'Details · DNagB',
  },
  {
    path: 'dnagb/vereinsstrukturen',
    loadComponent: () =>
      import('./pages/association/association.component').then(
        (m) => m.AssociationComponent
      ),
    title: 'Vereinsstruktur · DNagB',
  },
  {
    path: 'naginata-gruppen',
    loadComponent: () =>
      import('./pages/dojos/dojos.component').then((m) => m.DojosComponent),
    title: 'Naginata-Gruppen · DNagB',
  },
  {
    path: 'dnagb/mitglied-werden',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: 'Mitglied werden · DNagB',
  },
  {
    path: 'naginata/was-ist-naginata',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: 'Was ist Naginata · DNagB',
  },
  {
    path: 'naginata/ausruestung',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: 'Aurüstung · DNagB',
  },
  {
    path: 'naginata/kampfsport',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: 'Der Kampfsport · DNagB',
  },
  {
    path: 'naginata/geschichte',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: 'Geschichte · DNagB',
  },
  {
    path: 'info/pruefung',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: 'Prüfung · DNagB',
  },
  {
    path: 'info/nuetzliches',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: 'Nützliches · DNagB',
  },
  {
    path: 'info/veranstaltung-planen',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: 'Veranstaltung planen · DNagB',
  },
  {
    path: 'download',
    loadComponent: () =>
      import('./pages/download/download.component').then(
        (m) => m.DownloadComponent
      ),
    title: 'Downloads · DNagB',
  },
  {
    path: 'impressum',
    loadComponent: () =>
      import('./pages/imprint/imprint.component').then(
        (m) => m.ImprintComponent
      ),
    title: 'Impressum · DNagB',
  },
  {
    path: 'datenschutz',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: 'Datenschutz · DNagB',
  },
  {
    path: 'kontakt',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: 'Kontakt · DNagB',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'dnagb',
    redirectTo: 'dnagb/verein',
    pathMatch: 'full',
  },
  {
    path: 'naginata',
    redirectTo: 'naginata/kampfsport',
    pathMatch: 'full',
  },
  {
    path: 'info',
    redirectTo: 'info/nuetzliches',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
