import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'

const firebaseApp = firebase.initializeApp({

    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyD43iflTYBvrt0ZCfMCKfzVZovJ-o55hsA",
    authDomain: "clone-utube-23bce.firebaseapp.com",
    databaseURL: "https://clone-utube-23bce.firebaseio.com",
    projectId: "clone-utube-23bce",
    storageBucket: "clone-utube-23bce.appspot.com",
    messagingSenderId: "428211813215",
    appId: "1:428211813215:web:db646d60c4c902ab2914ea",
    measurementId: "G-3CH1MVY9HT"
  
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth,provider }