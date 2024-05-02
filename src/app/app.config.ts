import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { LocalStorage } from 'ngx-webstorage';
import { LocalStorageProvider } from 'ngx-webstorage/lib/core/nativeStorage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),provideAnimations(), provideToastr({
    timeOut: 5000,
    positionClass: 'toast-bottom-center',
    preventDuplicates: true,
    closeButton:true
  }),

]
};
