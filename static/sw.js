// Bump the version to drop all cached pages and assets on the next visit.
const Version = 'v2';
const PageCache = `TimmyKokke-pages-${Version}`;
const AssetCache = `TimmyKokke-assets-${Version}`;
const CurrentCaches = [PageCache, AssetCache];

// Keep the page cache small; it only exists for offline fallback.
const MaxPages = 50;

// Static assets that are worth caching. Images, video and audio are left to
// the browser's HTTP cache so this cache does not grow without limit.
const AssetPattern = /\.(css|js|woff2?|ttf|eot|json)$/;

/**
 * On install, activate the new version right away.
 */
self.addEventListener('install', () => {
    self.skipWaiting();
});

/**
 * On activate, remove caches from older versions and take control of open pages.
 */
self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const names = await caches.keys();
        await Promise.all(names
            .filter(name => !CurrentCaches.includes(name))
            .map(name => caches.delete(name)));
        await self.clients.claim();
    })());
});

/**
 * On fetch, use network-first for pages and stale-while-revalidate for static
 * assets. Everything else goes straight to the network.
 */
self.addEventListener('fetch', (evt) => {
    const request = evt.request;
    if (request.method !== 'GET') {
        return;
    }

    const requestUrl = new URL(request.url);
    // only handle requests from my domain.
    if (requestUrl.origin !== location.origin ||
        requestUrl.hostname === 'localhost') {
        return;
    }

    if (request.mode === 'navigate') {
        evt.respondWith(networkFirst(evt));
    } else if (AssetPattern.test(requestUrl.pathname) &&
        requestUrl.pathname !== '/sw.js') {
        evt.respondWith(staleWhileRevalidate(evt));
    }
});

/**
 * Fetch the page from the network and cache it. Fall back to the cached copy
 * when offline.
 * @param {FetchEvent} evt
 * @returns {Promise<Response>}
 */
async function networkFirst(evt) {
    const cache = await caches.open(PageCache);
    try {
        const response = await fetch(evt.request);
        if (response.ok) {
            evt.waitUntil(cache.put(evt.request, response.clone())
                .then(() => trimCache(PageCache, MaxPages)));
        }
        return response;
    } catch (e) {
        const cached = await cache.match(evt.request);
        if (cached) {
            return cached;
        }
        throw e;
    }
}

/**
 * Return the cached asset right away when there is one, and refresh it from
 * the network in the background.
 * @param {FetchEvent} evt
 * @returns {Promise<Response>}
 */
async function staleWhileRevalidate(evt) {
    const cache = await caches.open(AssetCache);
    const cached = await cache.match(evt.request);
    const update = fetch(evt.request).then(async (response) => {
        if (response.ok) {
            await cache.put(evt.request, response.clone());
        }
        return response;
    });

    if (cached) {
        // if the update fails, just log it; the cached copy is already served.
        evt.waitUntil(update.catch(() =>
            console.warn('failed to update cache for ' + evt.request.url)));
        return cached;
    }
    return update;
}

/**
 * Remove the oldest entries until the cache holds at most maxEntries.
 * @param {string} name
 * @param {number} maxEntries
 */
async function trimCache(name, maxEntries) {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    for (let i = 0; i < keys.length - maxEntries; i++) {
        await cache.delete(keys[i]);
    }
}
