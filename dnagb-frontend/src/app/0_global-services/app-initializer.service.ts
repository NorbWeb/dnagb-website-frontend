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
      const boardSpaeker = await this.getBoardSpeaker().catch(reject);
      const associationText = await this.getAssociationText().catch(reject);
      console.group('🐦‍⬛: AppInitializerService');
      // console.log('settings', settings.data);
      // console.log('events', events.data);
      console.log('board_speaker', boardSpaeker.data);
      console.log('association_text', associationText.data);
      console.groupEnd();
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
          board_speaker: boardSpaeker.data,
          membership: membership.data,
        },

        events: [...this.convertDate(events.data)],
      });

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

  private async getBoardSpeaker() {
    const res = await fetch(`${environment.cmsUrl}/items/board_speaker`);
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
