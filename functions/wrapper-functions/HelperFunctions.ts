import { count } from 'console';
import * as admin from 'firebase-admin'

let serviceAccount = require('./spasticballoon-e89ac-firebase-adminsdk-k0a8a-4f72807f03.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://spasticballoon-e89ac-default-rtdb.firebaseio.com"
});

/**
 * 
 * @param playerName String
 * @param counts int
 * @param challengeType String -> only these values (30s, 60s and 10s) 
 */
export const addPlayerScore = (playerName, counts, challengeType) => {
    var db = admin.database();
    var ref = db.ref('/' + challengeType); 

    let dateTime = new Date()

    ref.push({
        name: playerName,
        counts: counts,
        createdAt: dateTime.toUTCString()
    });

    return;
}

export const getChallengeScores = (challengeType) => {
    var db = admin.database();
    var ref = db.ref('/' + challengeType); 

    ref.on('value', function(snapshot) {
        if (!snapshot.exists()) {
            throw new Error("Challenge type does not exist!");
        } else {
            let details = snapshot.val();
            let keys = Object.keys(details);
            console.log(keys);
            var result = []
            console.log(details);
            for (var i = 0; i < keys.length; i++) {
                result.push({
                    "name": details[keys[i]]['name'],
                    "clickCount": details[keys[i]]['counts'],
                    "challengeType": challengeType,
                    "createdAt": details[keys[i]]['createdAt']
                });
            }
            
            result.sort((a , b) => {
                if (b['clickCount'] > a['clickCount']) {
                    return -1
                } else {
                    return 1;
                }
            })

            return result;
        }
    });
}