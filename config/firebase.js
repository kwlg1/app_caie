import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyCCkgdlRvZLGkkNJ6MjQe81L-2xhH6nrZI",
    authDomain: "appcaie.firebaseapp.com",
    projectId: "appcaie",
    storageBucket: "appcaie.firebasestorage.app",
    messagingSenderId: "767250192090",
    appId: "1:767250192090:web:98b844def4d350cbde37e3",
    measurementId: "G-FWNR6XWYX7"
  };
  

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
