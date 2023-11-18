// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeJogFf9GJ_FE5lMhmQThSZs_aLA9cpZY",
  authDomain: "edugpt-7d13b.firebaseapp.com",
  projectId: "edugpt-7d13b",
  storageBucket: "edugpt-7d13b.appspot.com",
  messagingSenderId: "59092827506",
  appId: "1:59092827506:web:973c67b75d35a21c8771eb",
  measurementId: "G-NNMLCVWXLY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);