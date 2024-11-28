import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDE91xfpEJexAeitCmvuxkqcGxUFt0SE04",
  authDomain: "practicafactuzone.firebaseapp.com",
  projectId: "practicafactuzone",
  storageBucket: "practicafactuzone.firebasestorage.app",
  messagingSenderId: "402501198277",
  appId: "1:402501198277:web:b5d3b27daae45e219eabac",
  measurementId: "G-KCKY2EPDEY"
};

  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  const db = getFirestore(app);
  
  export default db;