// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCsYe0x7Csi2um9qQDorNaHNqxrGVBPOBU',
  authDomain: 'bangladesh-brand-forum-28394.firebaseapp.com',
  projectId: 'bangladesh-brand-forum-28394',
  storageBucket: 'bangladesh-brand-forum-28394.appspot.com',
  messagingSenderId: '802088124469',
  appId: '1:802088124469:web:6ccb6e17e1ac81b51e717c',
  measurementId: 'G-HY36P4L1Q9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
