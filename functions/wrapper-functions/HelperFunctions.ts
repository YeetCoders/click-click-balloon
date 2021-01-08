import * as admin from 'firebase-admin'

let serviceAccount = require('./spasticballoon-e89ac-firebase-adminsdk-k0a8a-4f72807f03.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://spasticballoon-e89ac-default-rtdb.firebaseio.com"
});

export const enterRoom = (roomCode, playerID ,callback) => {
    var db = admin.database();
    var ref = db.ref('/rooms/' + String(roomCode)); 
    
    // check if room exists
    ref.on('value', function(snapshot) {
        if (!snapshot.exists()) {
            throw new Error("Room does not exist!");
        }
    });

    ref = ref.child(String(playerID))

    ref.set({
        "count":  0 // set to default 0
    })

    ref.on('value', callback);

    return;
}


export const createRoom = (roomCode, playerID) => {
    var db = admin.database();
    var ref = db.ref("/rooms");
    ref = ref.child(String(roomCode));

    ref.set({
        "host": playerID,
        "started": false
    })

    return;
};

export const updateCount = (roomCode, playerID, count) => {
    var db = admin.database();
    var ref = db.ref('/rooms/' + String(roomCode)); 
    
    // check if room exists
    ref.on('value', function(snapshot) {
        if (!snapshot.exists()) {
            throw new Error("Room does not exist!");
        }
    });

    ref = ref.child(String(playerID))
    ref.once('value', function(snapshot) {
        if (!snapshot.exists()) {
            throw new Error("User not in the room");
        } else {
            ref.set({
                "count": snapshot.val()["count"] + count
            })
        }
    });

    return;
}

export const startRoom = (roomCode) => {
    var db = admin.database();
    var ref = db.ref('/rooms/' + String(roomCode)); 

    ref.update({
        "started": true
    });
}
