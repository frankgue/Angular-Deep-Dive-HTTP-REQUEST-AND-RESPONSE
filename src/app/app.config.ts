import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';

// function loggingInterceptor(request:HttpRequest<unknown>, next: HttpHandlerFn) {
//   console.log("[OutGoing REQUEST : ]");
//   console.log(request);
//  return next(request);
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        loggingInterceptor
      ])
    ),
  ],
};
