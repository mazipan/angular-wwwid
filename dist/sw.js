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

workbox.router.registerRoute(
  new RegExp('^https:\/\/cdn-images.*'),
  workbox.strategies.cacheFirst({
    cacheName: 'ng-wwwid-img',
    cacheableResponse: {
      statuses: [0, 200], // Make sure 0 is included in this list.
    }
  })
);

workbox.router.registerRoute(
  new RegExp('^https:\/\/res\.cloudinary\.com.*'),
  workbox.strategies.cacheFirst({
    cacheName: 'ng-wwwid-compressed-img',
    cacheableResponse: {
      statuses: [0, 200], // Make sure 0 is included in this list.
    }
  })
);

workbox.precache([
  {
    "url": "favicon.ico",
    "revision": "b9aa7c338693424aae99599bec875b5f"
  },
  {
    "url": "index.html",
    "revision": "d5699b634c56301f322003b33e341d1b"
  },
  {
    "url": "inline.318b50c57b4eba3d437b.bundle.js",
    "revision": "6eaa1608803b51f7d836604d9585670d"
  },
  {
    "url": "main.cb6bc2f8745e3361370d.bundle.js",
    "revision": "6ef7cff4de73494599a1fa3fe320878e"
  },
  {
    "url": "polyfills.f8ebbb1c5911266dd940.bundle.js",
    "revision": "9ea72f5b370578a53401ed404f748e8f"
  },
  {
    "url": "styles.757575cd822b1420ad75.bundle.css",
    "revision": "5b1c54b61f8510287785eb28ecf6861b"
  },
  {
    "url": "workbox-sw.prod.v2.1.3.js",
    "revision": "a9890beda9e5f17e4c68f42324217941"
  }
]);
