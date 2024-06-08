// imports will tell Next to bundle into our main js bundle that will be
// sent down to client
import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getFirestore, collection } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// Initialize the firebase app.
// connects the app to the cloud
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const userCollection = collection(db, "users");

// Initialize auth and firestore with 'firebaseApp' property
// @auth provides main user data - doesn't support custom usernames
export const auth = getAuth(firebaseApp);
export const firestore = db;
const googleAuthProvider = new GoogleAuthProvider();
export { googleAuthProvider, signInWithPopup };

export default firebaseApp;
