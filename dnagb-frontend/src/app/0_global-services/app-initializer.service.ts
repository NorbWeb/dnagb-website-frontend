import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/env';
import { UtilsService } from './utils.service';
import { StateService } from './state.service';
import { NewsItem, NewsItemType } from '../1_types-and-interfaces/NewsItem';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(private state: StateService) {}
  utils = inject(UtilsService);
  init(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const settings = await this.getAppConf().catch(reject);
      const events = await this.getEvents().catch(reject);
      const membership = await this.getMembership().catch(reject);
      const board = await this.getBoard().catch(reject);
      const speaker = await this.getSpeaker().catch(reject);
      const associationText = await this.getAssociationText().catch(reject);
      const dojos = await this.getDojos().catch(reject);
      const history = await this.getHistory().catch(reject);
      const budo = await this.getBudo().catch(reject);
      const examination = await this.getExamination().catch(reject);
      const useful = await this.getUseful().catch(reject);
      const planing = await this.getPlaning().catch(reject);
      const imprint = await this.getImprint().catch(reject);
      const privacy = await this.getPrivacy().catch(reject);
      const contact = await this.getContact().catch(reject);
      const downloads = await this.getDownloads().catch(reject);
      const downloadsFiles = await this.getDownloadsFiles().catch(reject);
      const files = await this.getFiles();
      const folders = await this.getFolders();

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
        },
        association: {
          who_we_are: associationText.data,
          board: board.data,
          speaker: speaker.data,
          membership: membership.data,
          dojos: dojos.data,
          budo: budo.data,
          history: history.data,
        },
        info: {
          examination: examination.data,
          useful: useful.data,
          planing: planing.data,
        },
        legal: {
          imprint: imprint.data,
          privacy: privacy.data,
          contact: contact.data,
        },

        events: [...this.convertEventData(events.data)],
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

      resolve();
    });
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

  convertEventData(arr: NewsItem[]) {
    let rawData: NewsItem[] = [...arr];
    let result = [];
    let type: Record<string, NewsItemType> = {
      contest: 'Wettkampf',
      seminar: 'Seminar',
      examination: 'Prüfung',
    };
    for (const element of rawData) {
      element.date_start = new Date(element.date_start);
      if (element.date_end) {
        element.date_end = new Date(element.date_end);
      }
      let typeLabel: NewsItemType[] = [];
      for (let item of element.type) {
        typeLabel.push(type[item]);
      }
      element.type = typeLabel;
      result.push(element);
    }
    return result;
  }

  private async getAppConf() {
    const res = await fetch(`${environment.cmsUrl}/items/settings`);
    return await res.json();
  }

  private async getMembership() {
    const res = await fetch(`${environment.cmsUrl}/items/membership`);
    return await res.json();
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

  private async getDojos() {
    const res = await fetch(`${environment.cmsUrl}/items/dojos`);
    return await res.json();
  }

  private async getHistory() {
    const res = await fetch(`${environment.cmsUrl}/items/history`);
    return await res.json();
  }

  private async getBudo() {
    const res = await fetch(`${environment.cmsUrl}/items/budo`);
    return await res.json();
  }

  private async getExamination() {
    const res = await fetch(`${environment.cmsUrl}/items/examination`);
    return await res.json();
  }

  private async getUseful() {
    const res = await fetch(`${environment.cmsUrl}/items/useful`);
    return await res.json();
  }

  private async getPlaning() {
    const res = await fetch(`${environment.cmsUrl}/items/planing`);
    return await res.json();
  }

  private async getImprint() {
    const res = await fetch(`${environment.cmsUrl}/items/imprint`);
    return await res.json();
  }

  private async getPrivacy() {
    const res = await fetch(`${environment.cmsUrl}/items/privacy`);
    return await res.json();
  }

  private async getContact() {
    const res = await fetch(`${environment.cmsUrl}/items/contact`);
    return await res.json();
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
