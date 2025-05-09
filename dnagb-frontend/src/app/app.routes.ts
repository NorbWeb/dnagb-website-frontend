import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ImprintComponent } from './pages/legal/imprint/imprint.component';
import { PrivacyComponent } from './pages/legal/privacy/privacy.component';
import { ContactComponent } from './pages/legal/contact/contact.component';
import { DownloadComponent } from './pages/download/download.component';
import { DojosComponent } from './pages/dojos/dojos.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MembershipComponent } from './pages/dnagb/membership/membership.component';
import { EquipmentComponent } from './pages/naginata/equipment/equipment.component';
import { MartialArtComponent } from './pages/naginata/martial-art/martial-art.component';
import { HistoryComponent } from './pages/naginata/history/history.component';
import { ExamComponent } from './pages/infos/exam/exam.component';
import { HandyStuffComponent } from './pages/infos/handy-stuff/handy-stuff.component';
import { EventPlanComponent } from './pages/infos/event-plan/event-plan.component';
import { EventComponent } from './pages/news/event/event.component';
import { EventDetailComponent } from './pages/news/event-detail/event-detail.component';
import { AssociationComponent } from './pages/dnagb/association/association.component';
import { WhatIsComponent } from './pages/naginata/what-is/what-is.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home – DNagB',
  },
  {
    path: 'news',
    component: EventComponent,
    title: 'Aktuelles – DNagB',
  },
  {
    path: 'news-details/:id',
    component: EventDetailComponent,
    title: 'Details – DNagB',
  },
  {
    path: 'dnagb/vereinsstrukturen',
    component: AssociationComponent,
    title: 'Vereinsstruktur – DNagB',
  },
  {
    path: 'naginata-gruppen',
    component: DojosComponent,
    title: 'Naginata-Gruppen – DNagB',
  },
  {
    path: 'dnagb/mitglied-werden',
    component: MembershipComponent,
    title: 'Mitglied werden – DNagB',
  },
  {
    path: 'naginata/was-ist-naginata',
    component: WhatIsComponent,
    title: 'Was ist Naginata – DNagB',
  },
  {
    path: 'naginata/ausruestung',
    component: EquipmentComponent,
    title: 'Waffe & Rüstung – DNagB',
  },
  {
    path: 'naginata/kampfsport',
    component: MartialArtComponent,
    title: 'Der Kampfsport – DNagB',
  },
  {
    path: 'naginata/geschichte',
    component: HistoryComponent,
    title: 'Geschichte – DNagB',
  },
  {
    path: 'info/pruefung',
    component: ExamComponent,
    title: 'Prüfung – DNagB',
  },
  {
    path: 'info/nuetzliches',
    component: HandyStuffComponent,
    title: 'Nützliches – DNagB',
  },
  {
    path: 'info/veranstaltung-planen',
    component: EventPlanComponent,
    title: 'Veranstaltung planen – DNagB',
  },
  {
    path: 'download',
    component: DownloadComponent,
    title: 'Downloads – DNagB',
  },
  {
    path: 'imprint',
    component: ImprintComponent,
    title: 'Impressum – DNagB',
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    title: 'Datenschutz – DNagB',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Kontakt – DNagB',
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
    redirectTo: 'naginata/ausruestung',
    pathMatch: 'full',
  },
  {
    path: 'info',
    redirectTo: 'info/ausruestung',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];
