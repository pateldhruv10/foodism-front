// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-huYDzrz6pC5PxvC_DaSUyT3yRMMsmGE",
  authDomain: "foodism-app.firebaseapp.com",
  projectId: "foodism-app",
  storageBucket: "foodism-app.appspot.com",
  messagingSenderId: "1037609800511",
  appId: "1:1037609800511:web:75e56efa6531658ca6798a",
  measurementId: "G-3QKPMW5486",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    })
  };

export default firebase
