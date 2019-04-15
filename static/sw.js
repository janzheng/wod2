importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/2c9c15207f2083c5ebcf.js",
    "revision": "d12b8118c52c22f7c9fe64c28ed35e8d"
  },
  {
    "url": "/_nuxt/35740d2a3a33d1eaf9a4.js",
    "revision": "51f1198e2a0c50866175a94a55fb01c2"
  },
  {
    "url": "/_nuxt/4a2ef168e69cfa328161.js",
    "revision": "4454270d1d22cb659ecb7dc64c85c012"
  },
  {
    "url": "/_nuxt/4a5ef8ee3893d200b582.js",
    "revision": "16dd80a9b526848761f60825c0fe1f11"
  },
  {
    "url": "/_nuxt/5ab2c8f760867c43dc41.js",
    "revision": "051e527f244b771fed0fe40a7a72da69"
  },
  {
    "url": "/_nuxt/5b983d1c14fd9f489275.js",
    "revision": "743dfc4d36485febcf08eb150a23936d"
  },
  {
    "url": "/_nuxt/666becefb28663420870.js",
    "revision": "054fc4da855c45f2e84e9051c0ab9d9f"
  },
  {
    "url": "/_nuxt/7b40c73d641e216337b6.js",
    "revision": "1b6d84959081000618e61de42134e7de"
  },
  {
    "url": "/_nuxt/96411e1e8cf8995ac9fe.css",
    "revision": "1d1c507ac4e6ad14c69a258af91d05be"
  },
  {
    "url": "/_nuxt/aed2eeb88922d2ceb4f3.js",
    "revision": "23fdeea288a6e2001b79a61e3c12e92e"
  },
  {
    "url": "/_nuxt/b6fda82bf50590925861.js",
    "revision": "2b7c72aad1531ac05d6bfee504bb308b"
  },
  {
    "url": "/_nuxt/beb2d69b9f20a5033db1.css",
    "revision": "ad73ac256f898275a4837c4728df5eee"
  },
  {
    "url": "/_nuxt/c366c8c60652d5031492.js",
    "revision": "7866b07da71b15252a1d39c94b4858a8"
  },
  {
    "url": "/_nuxt/c72084dfd1849cf7e602.css",
    "revision": "386b249114cbab2548ccb8c2f70a9017"
  },
  {
    "url": "/_nuxt/c7fc20a5093af8b050c9.js",
    "revision": "a53017c63106ee3ca810a70bd263bc04"
  },
  {
    "url": "/_nuxt/cc6f432061439505da43.js",
    "revision": "0c7b70636dc93a486e60a4fc81113dcd"
  },
  {
    "url": "/_nuxt/df24cbba6ef6ec5ee7ed.js",
    "revision": "4a57cb8653069cb615ee82b3869d0cfb"
  },
  {
    "url": "/_nuxt/ea8e3185422247aa6f96.js",
    "revision": "9d93bd1a9955d881f13590dfde02c4bd"
  },
  {
    "url": "/_nuxt/eae76febb13d7ee5ff9f.js",
    "revision": "fcb31bb309b9cb5708ccb74cdd678e62"
  },
  {
    "url": "/_nuxt/fa55e50536817a43a663.js",
    "revision": "29ea3600bcd462b9a67690865feaf144"
  },
  {
    "url": "/_nuxt/img/6845612.png",
    "revision": "6845612b0d9cfe90ce19995b2e19a356"
  },
  {
    "url": "/_nuxt/img/b257fa9.svg",
    "revision": "b257fa9c5ac8c515ac4d77a667ce2943"
  }
], {
  "cacheId": "coeur2",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.precaching.precacheAndRoute(['/404.html'])

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

// offlinePage support
const strategy = workbox.strategies.networkOnly()
workbox.routing.registerRoute(new RegExp('/.*'), ({event}) => {
  return strategy.handle({event})
    .catch(() => caches.match('/404.html'))
})
