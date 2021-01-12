import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

var firebaseConfig = {
    apiKey: "AIzaSyDQa1bvhyCf1djVjXB3kBMHkphMg-_7Kuw",
    authDomain: "spasticballoon-e89ac.firebaseapp.com",
    databaseURL: "https://spasticballoon-e89ac-default-rtdb.firebaseio.com",
    projectId: "spasticballoon-e89ac",
    storageBucket: "spasticballoon-e89ac.appspot.com",
    messagingSenderId: "856813926036",
    appId: "1:856813926036:web:8a9a3245606cc4cb19e681",
    measurementId: "G-VMJ3TJR81C"
};

admin.initializeApp(firebaseConfig)

export const enterRoom = functions.https.onRequest((request, response) => {
    var db = admin.database();
    var ref = db.ref('/test')
    ref.set({
        4040: {
            player1: "motherdie",
            counts: 1000
        }
    });
    response.send("Does this work?");
});