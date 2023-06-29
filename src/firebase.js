import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyBAqLgLL4H5bbQrBu6D5QyZhJ03Z4qIEno',
  authDomain: "chatapk-e854c.firebaseapp.com",
  projectId: "chatapk-e854c",
  storageBucket: "chatapk-e854c.appspot.com",
  messagingSenderId: "97862328630",
  appId: "1:97862328630:web:0add0b3c9792f04b8a9397"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()



