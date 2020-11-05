
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
   
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