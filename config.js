import firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyA7UwvnXN2sx1iVhTFHAzS779Ew8-9Lhz8",
    authDomain: "booksanta-6d5a6.firebaseapp.com",
    databaseURL: "https://booksanta-6d5a6.firebaseio.com",
    projectId: "booksanta-6d5a6",
    storageBucket: "booksanta-6d5a6.appspot.com",
    messagingSenderId: "575855046067",
    appId: "1:575855046067:web:437d987e36fa17f8ef6fc6"
  };

   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);

export default firebase.firestore()


