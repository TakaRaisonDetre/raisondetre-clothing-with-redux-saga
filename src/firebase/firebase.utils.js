
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


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj =>{
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
   
  });

  return await batch.commit()

}

export const convertCollectionsSnapshotToMap = (collections) =>{
const transformedCollection = collections.docs.map(
  doc => {
    const {title, items} = doc.data();
    return {
      routeName : encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  console.log(transformedCollection)
  
  return transformedCollection.reduce((accumulator, collection)=>{
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
  },{})
}



  firebase.initializeApp(config);

  export const auth  = firebase.auth();
  export const firestore = firebase.firestore();


  // google signin
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;