import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyA4keKjtA61AJVyLoAQOUXcQrh0hXg_WZo',
  authDomain: 'zz-commerce-21ef1.firebaseapp.com',
  databaseURL:
    'https://zz-commerce-21ef1-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'zz-commerce-21ef1',
  storageBucket: 'zz-commerce-21ef1.appspot.com',
  messagingSenderId: '120405416719',
  appId: '1:120405416719:web:eb06ac98582d39afed3c7a',
  measurementId: 'G-T7TJG09KKC',
});

export default firebaseConfig;
