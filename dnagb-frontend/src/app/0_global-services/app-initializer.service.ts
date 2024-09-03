import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/env';
import { UtilsService } from './utils.service';
import { StateService } from './state.service';
import { NewsItem } from '../1_types-and-interfaces/NewsItem';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  exampleData: NewsItem[] = [
    {
      title: 'Seminar in XY',
      type: ['Wettkampf', 'Seminar'],
      startDate: new Date(2024, 10, 1, 9),
      endDate: new Date(2024, 10, 3, 18, 30),
      location: 'Fantasiestadt, Sporthalle SC Fantasie',
      announcement: '123-456-789',
      id: 1,
    },
    {
      title: 'Deutsche Meisterschaft',
      type: ['Wettkampf', 'Prüfung'],
      startDate: new Date(2024, 6, 15, 9),
      location: 'Berlin, Sporthalle SC Meisterschaft',
      announcement: '10-5654-4554',
      id: 2,
    },
    {
      title: 'Test 1',
      type: ['Seminar', 'Prüfung', 'Wettkampf'],
      startDate: new Date(2024, 11, 24, 9),
      location: 'Teststadt 1',
      announcement: '7543-7585648',
      id: 3,
    },
    {
      title: 'Test 2',
      type: ['Seminar', 'Prüfung', 'Wettkampf'],
      startDate: new Date(2024, 7, 10, 9),
      location: 'Teststadt 2',
      announcement: '7543-7585648',
      id: 4,
    },
    {
      title: 'Test 3',
      type: ['Seminar', 'Prüfung', 'Wettkampf'],
      startDate: new Date(2024, 11, 15, 9),
      location: 'Teststadt 3',
      announcement: '7543-7585648',
      id: 5,
    },
    {
      title: 'Osterereigniss',
      type: ['Seminar'],
      startDate: new Date(2024, 2, 1, 9),
      location: 'Wumpa-Wumpa, Heilige Wolke 7',
      announcement: '7543-7585648',
      id: 6,
    },
  ];
  constructor(private state: StateService) {}
  utils = inject(UtilsService);
  init(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const settings = await this.getAppConf().catch(reject);
      console.log('🐦‍⬛: AppInitializerService -> init', settings);
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
        news: [...this.exampleData],
      });
      console.log('🐦‍⬛: AppInitializerService -> init', this.state.getConf());

      resolve();
    });
  }

  private async getAppConf() {
    const res = await fetch(`${environment.cmsUrl}/items/settings`);
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
