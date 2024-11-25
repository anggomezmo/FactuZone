import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAGVBKPiqyzzftwgvln4vsjScJnUSOjBu0",
    authDomain: "factuzone-2dd2a.firebaseapp.com",
    projectId: "factuzone-2dd2a",
    storageBucket: "factuzone-2dd2a.firebasestorage.app",
    messagingSenderId: "501918868914",
    appId: "1:501918868914:web:4a5d8990f540bdbe7c70ab",
    measurementId: "G-QRS8VHQN69"
  };
  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  const db = getFirestore(app);
  
  export default db;