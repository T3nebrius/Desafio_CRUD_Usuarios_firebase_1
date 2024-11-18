
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAzS9ch0V0RQhOE9tT81yRkZEQj4phQJsA",
  authDomain: "basedesafio-3d29e.firebaseapp.com",
  projectId: "basedesafio-3d29e",
  storageBucket: "basedesafio-3d29e.firebasestorage.app",
  messagingSenderId: "508949771586",
  appId: "1:508949771586:web:3fcf3ab4a04c19fc6604db",
  measurementId: "G-13WD48G21Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };