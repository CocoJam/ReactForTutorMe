const webpush = require('web-push');
const fs_extra = require('fs-extra');
const fs = require('fs');

const vapidKeys = webpush.generateVAPIDKeys();

console.log(vapidKeys);
fs.writeFile("./src/web/Web_Push_Keys",JSON.stringify(vapidKeys) , function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
console.log(vapidKeys.publicKey, vapidKeys.privateKey);