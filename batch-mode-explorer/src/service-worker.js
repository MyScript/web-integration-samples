/* eslint-disable no-console */

const version = '{{ version }}';

self.addEventListener('install', function() {
  console.log('[ServiceWorker] Installed version', version);
})  