import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDfPWAkEfkM0O1yN6iRRgUe_wxTrdaUH3s",
  authDomain: "olx-clone-2d988.firebaseapp.com",
  databaseURL: "gs://olx-clone-2d988.appspot.com",
  projectId: "olx-clone-2d988",
  storageBucket: "olx-clone-2d988.appspot.com",
  messagingSenderId: "800249077729",
  appId: "1:800249077729:web:03ef9ffa2985168e37bca0"
};

export default firebase.initializeApp(firebaseConfig)
