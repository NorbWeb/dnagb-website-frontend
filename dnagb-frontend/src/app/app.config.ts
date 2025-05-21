import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { AppInitializerService } from './0_global-services/app-initializer.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const initializerFn = (
        (initService: AppInitializerService) => () =>
          initService.init()
      )(inject(AppInitializerService));
      return initializerFn();
    }),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
      })
    ),
  ],
};
