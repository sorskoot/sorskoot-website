
var CACHE = 'TimmyKokke-Offline';


self.addEventListener('fetch', evt => {        
  evt.respondWith(fromNetwork(evt.request, 400).catch(() => {
      return fromCache(evt.request);
  }));

  evt.waitUntil(update(evt.request));
});

function precache() {
  return caches.open(CACHE).then(cache => {
      return cache.addAll(files);
  });
}

function fromNetwork(request, timeout) {

  return new Promise(function (fulfill, reject) {
      var timeoutId = setTimeout(reject, timeout);
      fetch(request).then(function (response) {
          clearTimeout(timeoutId);
          fulfill(response);
      }, reject);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request){
  return new Promise((fulfill, reject)=>
      caches.open(CACHE).then(
          (cache)=> fetch(request).then(
              (response)=> cache.put(request, response).then(fulfill),
              reject
          ))
      )
}