import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDbMUiz0wC7Sxfsto05gH_PFsZ_pJoAxGg",
    authDomain: "my-todolist-app-4f101.firebaseapp.com",
    projectId: "my-todolist-app-4f101",
    storageBucket: "my-todolist-app-4f101.appspot.com",
    messagingSenderId: "801250059",
    appId: "1:801250059:web:44121aa22ed1d67334600e"
  };
  // Initialize Firebase

  export default firebase.initializeApp(firebaseConfig);