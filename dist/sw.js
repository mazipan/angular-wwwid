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
    "url": "assets/ng.png",
    "revision": "b9aa7c338693424aae99599bec875b5f"
  },
  {
    "url": "favicon.ico",
    "revision": "b9aa7c338693424aae99599bec875b5f"
  },
  {
    "url": "index.html",
    "revision": "8f241993981b99df977194f948228458"
  },
  {
    "url": "inline.318b50c57b4eba3d437b.bundle.js",
    "revision": "6eaa1608803b51f7d836604d9585670d"
  },
  {
    "url": "main.a36b4e952ae75bf3f57c.bundle.js",
    "revision": "92539f0185bdd91c01da990d7e99c3b4"
  },
  {
    "url": "polyfills.f8ebbb1c5911266dd940.bundle.js",
    "revision": "9ea72f5b370578a53401ed404f748e8f"
  },
  {
    "url": "styles.e4be0642a4754c5932c2.bundle.css",
    "revision": "cdf9b87f6c587c8c7ae27858ded2527c"
  },
  {
    "url": "workbox-sw.prod.v2.1.3.js",
    "revision": "a9890beda9e5f17e4c68f42324217941"
  },
  {
    "url": "assets/launcher-icon-2x.jpg",
    "revision": "dd35bb7abe5cab4a9a66b90fa69f1df0"
  },
  {
    "url": "assets/launcher-icon-3x.jpg",
    "revision": "2f12e82197b1cf645ec7e632daf66e65"
  },
  {
    "url": "assets/launcher-icon-4x.jpg",
    "revision": "784f3874cafe9a6bcd378d42720bc8d3"
  }
]);
