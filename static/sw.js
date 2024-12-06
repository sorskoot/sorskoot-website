var CacheName = 'TimmyKokke-Offline';

const files = [];

/**
 * On install, pre-cache provided resources.
 */
self.addEventListener('install', event => {
    // Ask the service worker to keep installing until the returning promise
    // resolves.
    event.waitUntil(caches.open(CacheName)
        .then(cache => cache.addAll(files))
        .then(self.skipWaiting()));
});

/** 
* On activate, continue immediately. This way you don't have to wait until 
* the next reload for the page.
*/
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

/** 
* On fetch, return from cache; if there's nothing in the cache, try the network. 
* Afterwards, update the cache.
*/
self.addEventListener('fetch', (evt) => {
    if (evt.request.method === 'POST') {
        return;
    }

    const requestUrl = new URL(evt.request.url);
    // only handle requests from my domain.
    if (requestUrl.origin === location.origin &&
        ~requestUrl.origin.match(/localhost/)) {
        // This promise resolves with either the cached response or a network response
        evt.respondWith(fromCache(evt.request).catch(() =>
            //Request is not in the cache, so fetch it from the network 
            fetch(evt.request.clone())
        ));

        // Wait until the cache is updated.
        evt.waitUntil(
            updateCache(evt.request)
        );
    }
});

/**
* get the response from the cache, or throw an error if it's not there
* @param {Request} request The request to get from the cache
* @returns {Promise<Response>} The response from the cache
*/
async function fromCache(request) {
    const cache = await caches.open(CacheName);
    const matching = await cache.match(request, { ignoreSearch: true });
    if (!matching) {
        // throwing the error will cause the promise to reject
        throw new Error('No match found in cache')
    };
    return matching;
}

/**
* Update the cache with the response from the network 
* @param {Request} request 
* @returns {Promise<Response>} The response fetched from the network
*/
async function updateCache(request) {
    const cache = await caches.open(CacheName);
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone());
        return response;
    } catch (e) {
        // if the fetch fails, just log it and continue.
        // no need to stall the request
        console.warn('failed to update cache for ' + request.url);
    }
}