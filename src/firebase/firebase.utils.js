
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
  apiKey: "AIzaSyDbnKZOT-udmX8P4RxXsXt7jQWIhmKZlEc",
  authDomain: "react-shop-60c32.firebaseapp.com",
  databaseURL: "https://react-shop-60c32.firebaseio.com",
  projectId: "react-shop-60c32",
  storageBucket: "react-shop-60c32.appspot.com",
  messagingSenderId: "401318346595",
  appId: "1:401318346595:web:e7744c45b82e5507a0dd56"
  };

export const createUserProfileDocument = async (userAuth, AdditionalData) =>{
if(!userAuth) return;

const userRef = firestore.doc(`users/${userAuth.uid}`);
const snapShot = await userRef.get();

if(!snapShot.exists){
    const {displayName, email, photoURL} = userAuth;
    const createdAt = new Date();

    try {
     await userRef.set({
         displayName,
         email,
         photoURL,
         createdAt,
       
     })
    } catch (error) {
      console.log('errro crearting user', error.message);
    }
}
return userRef;
}


  firebase.initializeApp(config);

  export const auth  = firebase.auth();
  export const firestore = firebase.firestore();


  // google signin
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;