import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/env';
import { UtilsService } from './utils.service';
import { StateService } from './state.service';
import {
  EventItem,
  EventType,
  NewsItem,
} from '../1_types-and-interfaces/NewsItem';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { routes } from '../app.routes';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(private state: StateService) {}
  utils = inject(UtilsService);
  init(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const associationText = await this.getAssociationText().catch(reject);
      const news = await this.getNews().catch(reject);
      const events = await this.getEvents().catch(reject);
      const imprint = await this.getImprint().catch(reject);
      const dojos = await this.getDojos().catch(reject);
      const speaker = await this.getSpeaker().catch(reject);
      const board = await this.getBoard().catch(reject);
      const downloads = await this.getDownloads().catch(reject);
      const downloadsFiles = await this.getDownloadsFiles().catch(reject);
      const settings = await this.getAppConf().catch(reject);
      const files = await this.getFiles();
      const folders = await this.getFolders();
      await this.getExamination().catch(reject);
      await this.getPrivacy().catch(reject);
      await this.getUseful().catch(reject);
      await this.getContact().catch(reject);
      await this.getPlaning().catch(reject);
      await this.getMembership().catch(reject);
      await this.getAboutNaginata().catch(reject);
      await this.getMartialArt().catch(reject);
      await this.getEquipment().catch(reject);
      await this.getHistory().catch(reject);

      registerLocaleData(localeDe, 'de-DE', localeDeExtra);

      this.setColors(
        settings.data.primary,
        settings.data.primary_text,
        settings.data.secondary,
        settings.data.secondary_text
      );

      this.state.updateConf({
        ...this.state.getConf(),
        appSettings: {
          title: {
            long_1: settings.data.title_long_1,
            long_2: settings.data.title_long_2,
            short: settings.data.title_short,
          },
          logo: settings.data.logo,
        },

        association: {
          who_we_are: associationText.data,
          board: board.data,
          speaker: speaker.data,
        },

        dojos: dojos.data,

        imprint: imprint.data,

        events: [...this.convertEventData(events.data)],

        news: [...this.convertNewsData(news.data)],

        downloads: this.arrangeDownloadFiles(
          downloads.data,
          downloadsFiles.data,
          files.data
        ),

        files: this.arrangeAllFiles(files.data, folders.data),
      });

      console.log(
        '🐦‍⬛: AppInitializerService -> constructor -> ',
        this.state.getConf()
      );

      this.setFavIcon(settings.data.favicon);
      resolve();
    });
  }

  setFavIcon(id: string) {
    let favIcon: HTMLLinkElement | null = document.querySelector('#favIcon');

    if (!favIcon) return;
    favIcon.href = `${environment.cmsUrl}/assets/${id}`;
  }

  arrangeDownloadFiles(downloads: any, downloadFiles: any, files: any) {
    downloads.files = [];

    for (const element of downloadFiles) {
      element.data = files.filter(
        (item: { id: string }) => item.id === element.directus_files_id
      )[0];

      downloads.files.push(element);
    }

    return downloads;
  }

  arrangeAllFiles(files: any, folders: any) {
    let result: any = {};
    let counter = 1;
    for (const folder of folders) {
      result[`folder_${counter}`] = {
        id: folder.id,
        name: folder.name,
        files: files.filter((item: any) => item.folder === folder.id),
      };
      counter++;
    }

    return result;
  }

  convertEventData(arr: EventItem[]) {
    let today = new Date();
    let rawData: EventItem[] = [...arr];
    let result = [];
    let type: Record<string, EventType> = {
      contest: 'Wettkampf',
      seminar: 'Seminar',
      examination: 'Prüfung',
    };
    for (const element of rawData) {
      element.date_start = new Date(element.date_start);
      if (element.date_start < today) {
        element.past = true;
      }
      if (element.date_end) {
        element.date_end = new Date(element.date_end);
      }
      let typeLabel: EventType[] = [];
      if (element.type) {
        for (let item of element.type) {
          typeLabel.push(type[item]);
        }
      }
      element.type = typeLabel;
      result.push(element);
    }

    result.sort((a: any, b: any) => {
      return b.date_start - a.date_start;
    });
    return result;
  }

  convertNewsData(arr: NewsItem[]) {
    let rawData: NewsItem[] = [...arr];
    let result = [];
    for (const element of rawData) {
      element.date_start = new Date(element.date_start);
      result.push(element);
    }
    result.sort((a: any, b: any) => {
      return b.date_start - a.date_start;
    });
    return result;
  }

  private async getAppConf() {
    const res = await fetch(`${environment.cmsUrl}/items/settings`);
    return await res.json();
  }

  private async getMembership() {
    const res = await fetch(`${environment.cmsUrl}/items/membership`);
    const json = await res.json();

    let route = routes.find((r) => {
      return r.path === 'dnagb/mitglied-werden';
    });

    if (route) {
      route.data = {
        html: json.data['membership_text'],
        status: json.data.status,
      };
    }
  }

  private async getBoard() {
    const res = await fetch(`${environment.cmsUrl}/items/board`);
    return await res.json();
  }

  private async getSpeaker() {
    const res = await fetch(`${environment.cmsUrl}/items/speaker`);
    return await res.json();
  }

  private async getAssociationText() {
    const res = await fetch(`${environment.cmsUrl}/items/association_text`);
    return await res.json();
  }

  private async getEvents() {
    const res = await fetch(`${environment.cmsUrl}/items/events`);
    return await res.json();
  }

  private async getNews() {
    const res = await fetch(`${environment.cmsUrl}/items/news`);
    return await res.json();
  }

  private async getDojos() {
    const res = await fetch(`${environment.cmsUrl}/items/dojos`);
    return await res.json();
  }

  private async getAboutNaginata() {
    const res = await fetch(`${environment.cmsUrl}/items/about_naginata`);
    const json = await res.json();

    let route = routes.find((r) => {
      return r.path === 'naginata/was-ist-naginata';
    });

    if (route) {
      route.data = {
        html: json.data['about_naginata_text'],
        status: json.data.status,
      };
    }
  }

  private async getMartialArt() {
    const res = await fetch(`${environment.cmsUrl}/items/martial_art`);
    const json = await res.json();

    let route = routes.find((r) => {
      return r.path === 'naginata/kampfsport';
    });

    if (route) {
      route.data = {
        html: json.data['martial_art_text'],
        status: json.data.status,
      };
    }
  }

  private async getEquipment() {
    const res = await fetch(`${environment.cmsUrl}/items/equipment`);
    const json = await res.json();

    let route = routes.find((r) => {
      return r.path === 'naginata/ausruestung';
    });

    if (route) {
      route.data = {
        html: json.data['equipment_text'],
        status: json.data.status,
      };
    }
  }

  private async getHistory() {
    const res = await fetch(`${environment.cmsUrl}/items/history`);
    const json = await res.json();

    let route = routes.find((r) => {
      return r.path === 'naginata/geschichte';
    });

    if (route) {
      route.data = {
        html: json.data['history_text'],
        status: json.data.status,
      };
    }
  }

  private async getExamination() {
    const res = await fetch(`${environment.cmsUrl}/items/examination`);
    const json = await res.json();

    let route = routes.find((r) => {
      return r.path === 'info/pruefung';
    });

    if (route) {
      route.data = {
        html: json.data['examination_text'],
        status: json.data.status,
      };
    }
  }

  private async getUseful() {
    const res = await fetch(`${environment.cmsUrl}/items/useful`);
    const json = await res.json();

    let route = routes.find((r) => {
      return r.path === 'info/nuetzliches';
    });

    if (route) {
      route.data = {
        html: json.data['useful_text'],
        status: json.data.status,
      };
    }
  }

  private async getPlaning() {
    const res = await fetch(`${environment.cmsUrl}/items/planing`);
    const json = await res.json();

    let route = routes.find((r) => {
      return r.path === 'info/veranstaltung-planen';
    });

    if (route) {
      route.data = {
        html: json.data['planing_text'],
        status: json.data.status,
      };
    }
  }

  private async getImprint() {
    const res = await fetch(`${environment.cmsUrl}/items/imprint`);
    return await res.json();
  }

  private async getPrivacy() {
    const res = await fetch(`${environment.cmsUrl}/items/privacy`);
    const json = await res.json();

    let route = routes.find((r) => {
      return r.path === 'datenschutz';
    });

    if (route) {
      route.data = {
        html: json.data['privacy_text'],
        status: json.data.status,
      };
    }
  }

  private async getContact() {
    const res = await fetch(`${environment.cmsUrl}/items/contact`);
    const json = await res.json();

    let route = routes.find((r) => {
      return r.path === 'kontakt';
    });

    if (route) {
      route.data = {
        html: json.data['contact_text'],
        status: json.data.status,
      };
    }
  }

  private async getFiles() {
    const res = await fetch(`${environment.cmsUrl}/files`);
    return await res.json();
  }

  private async getFolders() {
    const res = await fetch(`${environment.cmsUrl}/folders`);
    return await res.json();
  }

  private async getDownloads() {
    const res = await fetch(`${environment.cmsUrl}/items/downloads`);
    return await res.json();
  }

  private async getDownloadsFiles() {
    const res = await fetch(`${environment.cmsUrl}/items/downloads_files`);
    return res.json();
  }

  private setColors(
    primary: string,
    primary_text: string,
    secondary: string,
    secondary_text: string
  ) {
    document.documentElement.style.setProperty(
      '--primary-lighten',
      this.utils.calculateColor(primary, 'lighten')
    );
    document.documentElement.style.setProperty('--primary', primary);
    document.documentElement.style.setProperty(
      '--primary-darken',
      this.utils.calculateColor(primary, 'darken')
    );
    document.documentElement.style.setProperty(
      '--secondary-lighten',
      this.utils.calculateColor(secondary, 'lighten')
    );
    document.documentElement.style.setProperty('--secondary', secondary);
    document.documentElement.style.setProperty(
      '--secondary-darken',
      this.utils.calculateColor(secondary, 'darken')
    );
    document.documentElement.style.setProperty('--primary-text', primary_text);
    document.documentElement.style.setProperty(
      '--secondary-text',
      secondary_text
    );
  }
}
