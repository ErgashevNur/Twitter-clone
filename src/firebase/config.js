import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAnuZJ_0-HdQhV7-G9nEsOCq-ZSGPcFnAs",
  authDomain: "project-bf44b.firebaseapp.com",
  projectId: "project-bf44b",
  storageBucket: "project-bf44b.firebasestorage.app",
  messagingSenderId: "1077241464404",
  appId: "1:1077241464404:web:875eac5d91ea68a2438fc1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export const auth = getAuth(app);

export const db = getFirestore(app);
