import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCSukAvixEZLxQ_P8vFICCWmkZk-Gq9fyM",
    authDomain: "zz-commerce.firebaseapp.com",
    databaseURL: "https://zz-commerce-default-rtdb.firebaseio.com",
    projectId: "zz-commerce",
    storageBucket: "zz-commerce.appspot.com",
    messagingSenderId: "81411464036",
    appId: "1:81411464036:web:bcd24731dc806e4e3b3871",
    measurementId: "G-4X5K9LBZR4"
});

export default firebaseConfig;