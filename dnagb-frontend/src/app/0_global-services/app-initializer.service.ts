import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  init(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const settings = await this.getAppSettings().catch(reject);
      console.log('🐦‍⬛: AppInitializerService -> init', settings);
      resolve();
    });
  }

  private getAppSettings() {
    return fetch(`${environment.cmsUrl}/items/settings`).then((res) =>
      res.json()
    );
  }
}
