import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';
import { getFirestore } from "firebase/firestore";
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";


declare global {
    // eslint-disable-next-line no-var
    var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined
}

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "revents-2023-6b66b.firebaseapp.com",
    projectId: "revents-2023-6b66b",
    databaseURL: "https://revents-2023-6b66b-default-rtdb.firebaseio.com",
    storageBucket: "revents-2023-6b66b.appspot.com",
    messagingSenderId: "549915020665",
    appId: "1:549915020665:web:1ae9afa7c92e2a7ce073a8"
};

// if (import.meta.env.DEV) {
//     self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
// }

const app = initializeApp(firebaseConfig);


// initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider('6LcP5FIpAAAAAEthxx9Hz9vqndieYuxSVM8GSoCJ'),
//     isTokenAutoRefreshEnabled: true
// })

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const fb = getDatabase(app);