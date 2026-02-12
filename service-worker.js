const CACHE_NAME = 'faberlic-v1.0.0';
const RUNTIME_CACHE = 'faberlic-runtime';

// Files to cache immediately on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Poppins:wght@300;400;500;600&display=swap'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app shell');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin) &&
        !event.request.url.includes('fonts.googleapis.com') &&
        !event.request.url.includes('fonts.gstatic.com') &&
        !event.request.url.includes('unsplash.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                // Return cached version
                return cachedResponse;
            }

            // Clone the request
            const fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(response => {
                // Check if valid response
                if (!response || response.status !== 200 || response.type === 'error') {
                    return response;
                }

                // Clone the response
                const responseToCache = response.clone();

                // Cache images and fonts
                if (event.request.url.includes('unsplash.com') ||
                    event.request.url.includes('fonts.gstatic.com')) {
                    caches.open(RUNTIME_CACHE).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }

                return response;
            }).catch(() => {
                // Return offline page or fallback if available
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            });
        })
    );
});

// Background sync for offline form submissions (future enhancement)
self.addEventListener('sync', (event) => {
    console.log('Background sync triggered');

    if (event.tag === 'sync-orders') {
        event.waitUntil(
            // Handle syncing orders when back online
            syncOrders()
        );
    }
});

async function syncOrders() {
    // Future implementation for syncing orders
    console.log('Syncing orders...');
}

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
    console.log('Push notification received');

    const options = {
        body: event.data ? event.data.text() : 'Yangi mahsulotlar mavjud!',
        icon: '/icon-192.svg',
        badge: '/icon-192.svg',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ko\'rish',
                icon: '/icon-192.svg'
            },
            {
                action: 'close',
                title: 'Yopish'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Faberlic', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked');

    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler for communication with main app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        const urlsToCache = event.data.payload;
        event.waitUntil(
            caches.open(RUNTIME_CACHE).then(cache => {
                return cache.addAll(urlsToCache);
            })
        );
    }
});