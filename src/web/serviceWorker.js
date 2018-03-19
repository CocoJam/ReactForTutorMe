(function() {
    'use strict';
    var staticCacheName = 'pages-cache-v2';
    var filesToCache = [".","./PushScript.js","../app/bundle.js"];
    self.addEventListener('install', function(event) {
        console.log('Service worker installing...');
        console.log('Attempting to install service worker and cache static assets');
        event.waitUntil(
            caches.open(staticCacheName)
                .then(function(cache) {
                    return cache.addAll(filesToCache);
                })
        );
    });
    self.addEventListener('activate', function(event) {
        console.log('Service worker activating...');

    });
    self.addEventListener('fetch', function(event) {
        console.log('Fetching:', event.request.url);
        event.respondWith(
            caches.match(event.request).then(function(response) {
                console.log(event.request);
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request)
                    .then(function(response) {return caches.open(staticCacheName).then(function(cache) {
                            if (event.request.url.indexOf('test') < 0) {
                                cache.put(event.request.url, response.clone());
                            }
                            return response;
                        });
                    });
            }).catch(function(error) {
                // TODO 6 - Respond with custom offline page
                console.log('Error, ', error);
                return caches.match('pages/offline.html');
            })
        );

    });
    self.addEventListener('notificationclose', function(e) {
        var notification = e.notification;
        var primaryKey = notification.data.primaryKey;

        console.log('Closed notification: ' + primaryKey);
    });

    self.addEventListener('notificationclick', function(e) {
        var notification = e.notification;
        var primaryKey = notification.data.primaryKey;
        var action = e.action;

        if (action === 'close') {
            notification.close();
        } else {
            e.waitUntil(
                clients.matchAll().then(function(clis) {
                    var client = clis.find(function(c) {
                        return c.visibilityState === 'visible';
                    });
                    if (client !== undefined) {
                        client.navigate("//www.google.com");
                        client.focus();
                    } else {
                        // there are no visible windows. Open one.
                        client.navigate("//www.google.com");
                        notification.close();
                    }
                })
            );
        }

        self.registration.getNotifications().then(function(notifications) {
            notifications.forEach(function(notification) {
                notification.close();
            });
        });
    });

    self.addEventListener('push', function(e) {
        var body;
        console.log(e.action);
        console.log( e.data.json());
        if (e.data) {
            body = e.data.text();
        } else {
            body = 'Default body';
        }

        var options = {
            body: body,
            icon: 'images/notification-flat.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {action: 'explore', title: 'Go to the site',
                    icon: 'images/checkmark.png'},
                {action: 'close', title: 'Close the notification',
                    icon: 'images/xmark.png'},
            ]
        };
        e.waitUntil(
            clients.matchAll().then(function(c) {
                // console.log(c);
                if (c.length === 0) {
                    // Show notification
                    self.registration.showNotification('Push Notification', options);
                } else {
                    // Send a message to the page to update the UI
                    self.registration.showNotification('Push Notification', options);
                    console.log('Application is already open!');
                }
            })
        );
    });
})();
