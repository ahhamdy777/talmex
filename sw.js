/* TALMEX – service worker (offline cache) */
const CACHE = 'talmex-v4';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/talmex-logo.webp',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/hero-family.webp',
  './assets/dates.webp',
  './assets/project-logo.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()).catch(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;              // fonts / external: let the network handle it

  if (req.mode === 'navigate') {                            // pages: network first, cache as fallback
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  e.respondWith(                                            // assets: cache first
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => hit))
  );
});
