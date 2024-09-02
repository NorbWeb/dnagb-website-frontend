import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ContactComponent } from './components/contact/contact.component';
import { AssociationComponent } from './components/association/association.component';
import { DownloadComponent } from './components/download/download.component';
import { DojosComponent } from './components/dojos/dojos.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MembershipComponent } from './components/membership/membership.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { MartialArtComponent } from './components/martial-art/martial-art.component';
import { HistoryComponent } from './components/history/history.component';
import { ExamComponent } from './components/exam/exam.component';
import { HandyStuffComponent } from './components/handy-stuff/handy-stuff.component';
import { EventPlanComponent } from './components/event-plan/event-plan.component';
import { NewsComponent } from './components/news/news.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home – DNagB',
  },
  {
    path: 'news',
    component: NewsComponent,
    title: 'Aktuelles – DNagB',
  },
  {
    path: 'dnagb/vereinsstrukturen',
    component: AssociationComponent,
    title: 'Vereinsstruktur – DNagB',
  },
  {
    path: 'dnagb/dojo',
    component: DojosComponent,
    title: 'Dojos – DNagB',
  },
  {
    path: 'dnagb/mitglied-werden',
    component: MembershipComponent,
    title: 'Mitglied werden – DNagB',
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
