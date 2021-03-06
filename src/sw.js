importScripts('workbox-sw.prod.v2.1.3.js');

const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
});

workbox.router.registerRoute(
  new RegExp('^https:\/\/api\.rss2json\.com.*'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.router.registerRoute(
  new RegExp('^https:\/\/api\.rss2json\.com.*'),
  workbox.strategies.cacheFirst({
    cacheName: 'ng-wwwid-api',
    cacheableResponse: {
      statuses: [0, 200], // Make sure 0 is included in this list.
    }
  })
);

// CDN Medium images
workbox.router.registerRoute(
  new RegExp('^https:\/\/cdn-images.*'),
  workbox.strategies.cacheFirst({
    cacheName: 'ng-wwwid-cdn-img',
    cacheableResponse: {
      statuses: [0, 200], // Make sure 0 is included in this list.
    }
  })
);

// Cloudinary images
workbox.router.registerRoute(
  new RegExp('^https:\/\/res\.cloudinary\.com.*'),
  workbox.strategies.cacheFirst({
    cacheName: 'ng-wwwid-compressed-img',
    cacheableResponse: {
      statuses: [0, 200], // Make sure 0 is included in this list.
    }
  })
);

// All other images
workbox.router.registerRoute(
  new RegExp('\w+.*.(jpg|jpeg|png|svg|ico)$'),
  workbox.strategies.cacheFirst({
    cacheName: 'ng-wwwid-img',
    cacheableResponse: {
      statuses: [0, 200], // Make sure 0 is included in this list.
    }
  })
);

workbox.precache([]);
