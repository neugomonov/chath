import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAuOO-V5mLIkgFNVPa7flbREUGywDgiXPI",
    authDomain: "chath-v-v.firebaseapp.com",
    projectId: "chath-v-v",
    storageBucket: "chath-v-v.appspot.com",
    messagingSenderId: "73371156001",
    appId: "1:73371156001:web:5887d187cbe7b2ed57ad60",
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
