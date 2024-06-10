import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { UpToDateComponent } from './up-to-date/up-to-date.component';

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
