const subButton = document.getElementById("subscriptionButton");
const textBox = document.getElementById("textBox");
document.getElementById("press").addEventListener("click", sending);
var swRegistration = null;
var applicationServerKey = null;
var keyPairs = null;
var applicationServerPublicKey = null;


if ("ServiceWorker" in window) {
    navigator.serviceWorker.register("./web/serviceWorker.js").then(function (sw) {
        console.log("got the service worker " + sw + " the scope is " + sw.scope);

        fetch("/fetchKeyPairs", {method: "GET"}).then(function (res) {
            return res.json();
        }).then(function (res) {
            return res;
        }).then(function (res) {
            return res;
        }).then(function (res) {
            console.log(res);
            applicationServerKey = urlB64ToUint8Array(res.publicKey);
            swRegistration = sw;
            swRegistration.pushManager.getSubscription().then(function (subscription) {
                console.log("this is the subscription " + subscription);
                console.log(JSON.stringify(subscription));
                checkSubscription();
            });
        }).catch(function (error) {
            console.log(error)
        });
    });
    if (('Notification' in window)) {
        console.log('Notifications is supported in this browser');
        Notification.requestPermission(function (status) {
            console.log('Notification permission status:', status);
        });
    }
}

function checkSubscription() {
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            console.log("this is the subscription " + JSON.stringify(subscription))
            isSubscribed = (subscription !== null);
            if (isSubscribed) {
                console.log('User IS subscribed.');
                subButton.innerHTML = "unSubscribe";
                subButton.onclick = unSubscription;
            } else {
                console.log('User is NOT subscribed.');
                subButton.innerHTML = "Subscribe";
                subButton.onclick = Subscription;
            }
        });
}


function Subscription() {
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    }).then(function (sub) {
        console.log(sub);
        return sub
    }).then(function (sub) {
        console.log(JSON.stringify(sub));
        checkSubscription();
    });
}

function sending() {
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            console.log("this is the subscription " + JSON.stringify(subscription));
            isSubscribed = (subscription !== null);
            if (isSubscribed) {
                console.log('User IS subscribed.');
                const JSONObject = {json: subscription.toJSON(), text: textBox.value};
                console.log(JSONObject)
                fetch("/", {method: "POST",headers: { "Content-Type": "application/json" }, body: JSON.stringify(JSONObject)})
            } else {
                console.log('User is NOT subscribed.');
            }
        });
}

function press() {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function (reg) {
            var options = {
                body: 'First notification!',
                tag: 'id1',
                icon: 'images/notification-flat.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                },
                actions: [
                    {
                        action: 'explore', title: 'Go to the site',
                        icon: 'images/checkmark.png'
                    },
                    {
                        action: 'close', title: 'Close the notification',
                        icon: 'images/xmark.png'
                    },
                ]
            };
            reg.showNotification('Hello world!', options);
        });
    }
}

function urlB64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function unSubscription() {
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription) {
                console.log(subscription.toJSON());
                return subscription.unsubscribe();
            }
        }).then(function (value) {
        checkSubscription()
    }).catch(function (error) {
        console.log('Error unsubscribing', error);
    })
}