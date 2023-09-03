import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDi51GjbfXFqG2P_dqeSR3J6qFEbpOVjO4",
    authDomain: "ecommerce-clothing-d3ac9.firebaseapp.com",
    projectId: "ecommerce-clothing-d3ac9",
    storageBucket: "ecommerce-clothing-d3ac9.appspot.com",
    messagingSenderId: "1024105517951",
    appId: "1:1024105517951:web:61f95d281197ea9307404a"
  };

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth, additionalInformation = {}
  ) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.error("Error creating user document", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {return};
  return await createUserWithEmailAndPassword(auth, email, password);
}
