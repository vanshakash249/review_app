import { firebase } from '@firebase/app';
import '@firebase/firestore';

const settings = { timestampsInSnapshots: true };

const config = {
    apiKey: "AIzaSyBooDo3Alqty-Fuv8H84oW77EUC7i-O6Ig",
    authDomain: "reviewapp-2a29c.firebaseapp.com",
    databaseURL: "https://reviewapp-2a29c.firebaseio.com",
    projectId: "reviewapp-2a29c",
    storageBucket: "reviewapp-2a29c.appspot.com",
    messagingSenderId: "903852970289",
    appId: "1:903852970289:web:6b0f3f8380d0d37fc36010",
    measurementId: "G-2FT46LD3JL"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;