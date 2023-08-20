// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { FirebaseStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChkgUn_JfStbwgfcExEX7dcay8W6CBL-8",
  authDomain: "vue-auth-fuelbuddy-681a4.firebaseapp.com",
  projectId: "vue-auth-fuelbuddy-681a4",
  storageBucket: "vue-auth-fuelbuddy-681a4.appspot.com",
  messagingSenderId: "153993114258",
  appId: "1:153993114258:web:b44fc1a88549daaf60ac4b",
  measurementId: "G-3ZT2WZHGTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const auth = getAuth(app);

export { auth };
export type { FirebaseStorage };
