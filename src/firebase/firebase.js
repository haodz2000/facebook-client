// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChC0ZtyWYjX8cRj3EguMJzHL__ML69qSA",
  authDomain: "facebook-38c29.firebaseapp.com",
  projectId: "facebook-38c29",
  storageBucket: "facebook-38c29.appspot.com",
  messagingSenderId: "610430650639",
  appId: "1:610430650639:web:499a46cc921cfe847e967a",
  measurementId: "G-XYE09N938V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;