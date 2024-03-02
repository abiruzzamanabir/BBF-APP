// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getAuth,initializeAuth, getReactNativePersistence} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAKe6RgttRpEe7rO2m5xLo3m3Fu7aLXNXs',
  authDomain: 'bangladesh-brand-forum.firebaseapp.com',
  projectId: 'bangladesh-brand-forum',
  storageBucket: 'bangladesh-brand-forum.appspot.com',
  messagingSenderId: '108077745441',
  appId: '1:108077745441:web:cc32f795294fcd5a1aea60',
  measurementId: 'G-B0GPQ2TY9T',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
