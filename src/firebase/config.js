// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmPQLPVv8W4O3BFWgopFMHroPnKH0WQYU",
  authDomain: "bright99-shop.firebaseapp.com",
  projectId: "bright99-shop",
  storageBucket: "bright99-shop.appspot.com",
  messagingSenderId: "1063432548970",
  appId: "1:1063432548970:web:c9fdfbf1625d1154641013",
  measurementId: "G-49YMXG1W4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);