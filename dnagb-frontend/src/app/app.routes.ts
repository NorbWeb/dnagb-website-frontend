import { Routes } from '@angular/router';

let shortTitle = 'DNagB';
// TODO : Make this configurable from conf()
export let routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: `Home · ${shortTitle}`,
  },
  {
    path: 'news',
    loadComponent: () =>
      import('./pages/news/event/event.component').then(
        (m) => m.EventComponent
      ),
    title: `Aktuelles · ${shortTitle}`,
  },
  {
    path: 'news/news-details/:id',
    loadComponent: () =>
      import('./pages/news/event-detail/event-detail.component').then(
        (m) => m.EventDetailComponent
      ),
    title: `Details · ${shortTitle}`,
  },
  {
    path: 'news/event-details/:id',
    loadComponent: () =>
      import('./pages/news/event-detail/event-detail.component').then(
        (m) => m.EventDetailComponent
      ),
    title: `Details · ${shortTitle}`,
  },
  {
    path: 'dnagb/vereinsstrukturen',
    loadComponent: () =>
      import('./pages/association/association.component').then(
        (m) => m.AssociationComponent
      ),
    title: `Vereinsstruktur · ${shortTitle}`,
  },
  {
    path: 'naginata-gruppen',
    loadComponent: () =>
      import('./pages/dojos/dojos.component').then((m) => m.DojosComponent),
    title: `Naginata-Gruppen · ${shortTitle}`,
  },
  {
    path: 'dnagb/mitglied-werden',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: `Mitglied werden · ${shortTitle}`,
  },
  {
    path: 'naginata/was-ist-naginata',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: `Was ist Naginata · ${shortTitle}`,
  },
  {
    path: 'naginata/ausruestung',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: `Aurüstung · ${shortTitle}`,
  },
  {
    path: 'naginata/kampfsport',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: `Der Kampfsport · ${shortTitle}`,
  },
  {
    path: 'naginata/geschichte',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: `Geschichte · ${shortTitle}`,
  },
  {
    path: 'info/pruefung',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: `Prüfung · ${shortTitle}`,
  },
  {
    path: 'info/nuetzliches',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: `Nützliches · ${shortTitle}`,
  },
  {
    path: 'info/veranstaltung-planen',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: `Veranstaltung planen · ${shortTitle}`,
  },
  {
    path: 'download',
    loadComponent: () =>
      import('./pages/download/download.component').then(
        (m) => m.DownloadComponent
      ),
    title: `Downloads · ${shortTitle}`,
  },
  {
    path: 'impressum',
    loadComponent: () =>
      import('./pages/imprint/imprint.component').then(
        (m) => m.ImprintComponent
      ),
    title: `Impressum · ${shortTitle}`,
  },
  {
    path: 'datenschutz',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: `Datenschutz · ${shortTitle}`,
  },
  {
    path: 'kontakt',
    loadComponent: () =>
      import('./components/custom-html/custom-html.component').then(
        (m) => m.CustomHtmlComponent
      ),
    title: `Kontakt · ${shortTitle}`,
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
