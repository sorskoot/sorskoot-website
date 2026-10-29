if ('serviceWorker' in navigator) {
    // register on every visit, so the browser also checks for a new sw.js.
    navigator.serviceWorker.register('/sw.js', {
        scope: '/'
    });
}
