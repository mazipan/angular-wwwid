import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => registerServiceWorker())
  .catch(err => console.log(err));

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => {
        console.log('Service Worker has been registered');
      })
      .catch(e =>
        console.error('Error during service worker registration:', e)
      );
  } else {
    console.warn('Service Worker is not supported');
  }
}
