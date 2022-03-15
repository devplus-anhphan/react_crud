// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCO6UHof3HMyMErfiJrOuzMcQFXfID3JiM",
    authDomain: "react-stud-management.firebaseapp.com",
    projectId: "react-stud-management",
    storageBucket: "react-stud-management.appspot.com",
    messagingSenderId: "171739531463",
    appId: "1:171739531463:web:34a4e362d60f04586bd6e2",
    measurementId: "G-E5KPJXHBX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);