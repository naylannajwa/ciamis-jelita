
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfVQFxnan-EUW09IszzNeK0RDHQHeqbuQ",
  authDomain: "ciamis-jelita.firebaseapp.com",
  projectId: "ciamis-jelita",
  storageBucket: "ciamis-jelita.firebasestorage.app",
  messagingSenderId: "783608862573",
  appId: "1:783608862573:web:d3af8c100ab02ae8feac64",
  measurementId: "G-R6G9W2TV2G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
