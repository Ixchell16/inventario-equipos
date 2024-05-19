const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/login',
    '/manifest.json',
    '/app.js',
    '/resources/css/estilos.css',
    '/resources/css/login.css',
    '/resources/css/style.css',
    '/resources/css/tablas.css',
    '/resources/css/dashboard/bootstrap.min.css',
    '/resources/css/dashboard/style.css',
    '/resources/img/logo.png',
    '/resources/lib/owlcarousel/assets/owl.carousel.min.css',
    '/resources/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css',
    '/resources/lib/owlcarousel/assets/owl.carousel.min.css',
    '/resources/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-256x256.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
