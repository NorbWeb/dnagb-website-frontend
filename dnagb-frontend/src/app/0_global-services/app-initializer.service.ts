import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/env';
import { UtilsService } from './utils.service';
import { StateService } from './state.service';
import { NewsItem } from '../1_types-and-interfaces/NewsItem';

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

      // console.group('🐦‍⬛: AppInitializerService');
      // console.log('settings', settings.data);
      // console.log('events', events.data);
      // console.log('association_text', associationText.data);
      // console.groupEnd();
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

        events: [...this.convertDate(events.data)],
      });

      console.log(
        '🐦‍⬛: AppInitializerService -> constructor -> ',
        this.state.getConf()
      );

      resolve();
    });
  }

  convertDate(arr: NewsItem[]) {
    let rawData: NewsItem[] = [...arr];
    let result = [];
    for (const element of rawData) {
      element.date_start = new Date(element.date_start);
      if (element.date_end) {
        element.date_end = new Date(element.date_end);
      }
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
