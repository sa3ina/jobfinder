// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALjhZyxRRsCjtsWI0S-AvuO-DH6iTcKzs",
  authDomain: "jobproject-d31b7.firebaseapp.com",
  projectId: "jobproject-d31b7",
  storageBucket: "jobproject-d31b7.appspot.com",
  messagingSenderId: "391076056233",
  appId: "1:391076056233:web:b1ddf975ea6e02e0c3edb8",
  measurementId: "G-5ZQG83QV7P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
