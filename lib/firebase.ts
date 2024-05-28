// imports will tell Next to bundle into our main js bundle that will be
// sent down to client
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize the firebase app.
// connects the app to the cloud
// can only initialize this once - but Next may try to call fn again
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

// Export the firebase sdks to work with
export const auth = getAuth();
export const firestore = getFirestore();
export const storage = getStorage();