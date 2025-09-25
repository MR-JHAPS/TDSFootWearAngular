import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
    importProvidersFrom(HttpClient),  //this is to allow the usage of HttpClient in the project.
              provideHttpClient(), // this is for the token interceptor.
              BsModalService,
              provideAnimations(),
              provideToastr({
                timeOut: 2000,
                positionClass: 'toast-top-right',
                preventDuplicates: true,
                progressBar: true,
                closeButton: true,
                tapToDismiss: false
              }),]
};
