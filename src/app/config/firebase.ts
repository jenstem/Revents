import { initializeApp } from "firebase/app";
// import firestore
import 'firebase/firestore';
// import storage
import 'firebase/storage';
import { getFirestore } from "firebase/firestore";
// import auth from firebase - authentication
import 'firebase/auth';
import { getAuth } from "firebase/auth";
// import getStorage
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "revents-2023-6b66b.firebaseapp.com",
    projectId: "revents-2023-6b66b",
    storageBucket: "revents-2023-6b66b.appspot.com",
    messagingSenderId: "549915020665",
    appId: "1:549915020665:web:1ae9afa7c92e2a7ce073a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// export auth - authentication
export const auth = getAuth(app);

// export storage
export const storage = getStorage(app);