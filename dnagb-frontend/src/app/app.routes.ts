import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { UpToDateComponent } from './up-to-date/up-to-date.component';
import { AssociationComponent } from './association/association.component';
import { NaginataComponent } from './naginata/naginata.component';
import { InformationComponent } from './information/information.component';
import { DownloadComponent } from './download/download.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Startseite - DNagB',
  },
  {
    path: 'up-to-date',
    component: UpToDateComponent,
    title: 'Aktuelles - DNagB',
  },
  {
    path: 'dnagb',
    component: AssociationComponent,
    title: 'Der Verein - DNagB',
  },
  {
    path: 'naginata',
    component: NaginataComponent,
    title: 'Naginata - DNagB',
  },
  {
    path: 'info',
    component: InformationComponent,
    title: 'Infos - DNagB',
  },
  {
    path: 'download',
    component: DownloadComponent,
    title: 'Download - DNagB',
  },
  {
    path: 'imprint',
    component: ImprintComponent,
    title: 'Impressum - DNagB',
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    title: 'Datenschutz - DNagB',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Kontakt - DNagB',
  },
];
