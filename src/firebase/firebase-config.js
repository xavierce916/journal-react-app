import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};


// const firebaseConfig = {
//     apiKey: "AIzaSyBg59I7r1iQJiyp0GWSMtQsvPpk0tGadNM",
//     authDomain: "react-journal-app-d5f26.firebaseapp.com",
//     projectId: "react-journal-app-d5f26",
//     storageBucket: "react-journal-app-d5f26.appspot.com",
//     messagingSenderId: "1085172643436",
//     appId: "1:1085172643436:web:24f29d00b4d56b209c4a49"
// };

// const firebaseConfigTesting = {
//     apiKey: "AIzaSyDrZKo7NehAUzohQNJZ5sPgeiY5cvLK2Yo",
//     authDomain: "react-journal-testing-528c0.firebaseapp.com",
//     projectId: "react-journal-testing-528c0",
//     storageBucket: "react-journal-testing-528c0.appspot.com",
//     messagingSenderId: "162636624855",
//     appId: "1:162636624855:web:7d99cf0429c1171bb95192"
// };

// if( process.env.NODE_ENV === 'test' ) {

//     firebase.initializeApp(firebaseConfigTesting);
// } else {
    
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);

// }

firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }