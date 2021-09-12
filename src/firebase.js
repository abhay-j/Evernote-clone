// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDmSbecndUGUkhul3Okqp68BbWFJGe1DyQ",
  authDomain: "evernote-clone-6b4a2.firebaseapp.com",
  projectId: "evernote-clone-6b4a2",
  storageBucket: "evernote-clone-6b4a2.appspot.com",
  messagingSenderId: "403127504134",
  appId: "1:403127504134:web:fdf8cbc71653105e202287",
  measurementId: "G-MNG50NKCE2",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
