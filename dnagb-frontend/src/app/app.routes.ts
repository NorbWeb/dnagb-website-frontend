import { Routes } from '@angular/router';

export let routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: { title: 'Home' },
  },
  {
    path: 'news',
    loadComponent: () =>
      import('./pages/news/news.component').then((m) => m.NewsComponent),
    data: { title: 'Aktuelles' },
  },
  {
    path: 'news/news-details/:id',
    loadComponent: () =>
      import('./pages/details/news-detail/news-detail.component').then(
        (m) => m.NewsDetailComponent
      ),
    data: { title: 'Details' },
  },
  {
    path: 'news/event-details/:id',
    loadComponent: () =>
      import('./pages/details/event-detail/event-detail.component').then(
        (m) => m.EventDetailComponent
      ),
    data: { title: 'Details' },
  },
  {
    path: 'dnagb/vereinsstrukturen',
    loadComponent: () =>
      import('./pages/association/association.component').then(
        (m) => m.AssociationComponent
      ),
    data: { title: 'Vereinsstruktur' },
  },
  {
    path: 'naginata-gruppen',
    loadComponent: () =>
      import('./pages/dojos/dojos.component').then((m) => m.DojosComponent),
    data: { title: 'Naginata-Gruppen' },
  },
  {
    path: 'dnagb/mitglied-werden',
    loadComponent: () =>
      import('./pages/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
  },
  {
    path: 'naginata/was-ist-naginata',
    loadComponent: () =>
      import('./pages/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
  },
  {
    path: 'naginata/ausruestung',
    loadComponent: () =>
      import('./pages/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
  },
  {
    path: 'naginata/kampfsport',
    loadComponent: () =>
      import('./pages/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
  },
  {
    path: 'naginata/geschichte',
    loadComponent: () =>
      import('./pages/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
  },
  {
    path: 'info/pruefung',
    loadComponent: () =>
      import('./pages/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
  },
  {
    path: 'info/nuetzliches',
    loadComponent: () =>
      import('./pages/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
  },
  {
    path: 'info/veranstaltung-planen',
    loadComponent: () =>
      import('./pages/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
  },
  {
    path: 'download',
    loadComponent: () =>
      import('./pages/download/download.component').then(
        (m) => m.DownloadComponent
      ),
    data: { title: 'Downloads' },
  },
  {
    path: 'impressum',
    loadComponent: () =>
      import('./pages/imprint/imprint.component').then(
        (m) => m.ImprintComponent
      ),
    data: { title: 'Impressum' },
  },
  {
    path: 'datenschutz',
    loadComponent: () =>
      import('./pages/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
  },
  {
    path: 'kontakt',
    loadComponent: () =>
      import('./pages/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
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
    title: 'Seite nicht gefunden',
  },
];
