import firebase from "firebase/compat/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

firebase.initializeApp({
  apiKey:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_FIREBASE_API_KEY
      : process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_FIREBASE_AUTH_DOMAIN
      : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_FIREBASE_PROJECT_ID
      : process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_FIREBASE_STORAGE_BUCKET
      : process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_MESSAGING_SENDER_ID
      : process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_FIREBASE_APP_ID
      : process.env.REACT_APP_FIREBASE_APP_ID,
});

const firestore = getFirestore();
const auth = getAuth();

export { firebase, firestore, auth };
