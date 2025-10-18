// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL0nqyftmhHABCTIqdX5FMxNjzTCYD5Dk",
  authDomain: "xchangehub-9eec4.firebaseapp.com",
  projectId: "xchangehub-9eec4",
  storageBucket: "xchangehub-9eec4.firebasestorage.app",
  messagingSenderId: "928357627511",
  appId: "1:928357627511:web:14ba49769c19e0f973b872",
  measurementId: "G-WRMFWVWT07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;