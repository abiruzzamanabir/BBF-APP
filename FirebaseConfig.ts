// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKe6RgttRpEe7rO2m5xLo3m3Fu7aLXNXs",
  authDomain: "bangladesh-brand-forum.firebaseapp.com",
  projectId: "bangladesh-brand-forum",
  storageBucket: "bangladesh-brand-forum.appspot.com",
  messagingSenderId: "108077745441",
  appId: "1:108077745441:web:cc32f795294fcd5a1aea60",
  measurementId: "G-B0GPQ2TY9T"
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseapp);
export const auth = getAuth(firebaseapp);
export const analytics = getAnalytics(firebaseapp);