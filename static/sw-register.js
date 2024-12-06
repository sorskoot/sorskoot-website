if ('serviceWorker' in navigator) {
    if (!navigator.serviceWorker.controller) {
        //no active SW found, register...
        navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        })
    }
}

