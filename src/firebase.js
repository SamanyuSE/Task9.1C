// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAra73x37ejodTkctDPSWr8flCqjb4N3rw",
  authDomain: "task9-1cfinal.firebaseapp.com",
  projectId: "task9-1cfinal",
  storageBucket: "task9-1cfinal.firebasestorage.app",
  messagingSenderId: "420855088336",
  appId: "1:420855088336:web:fee30a0a55272813d08ad5",
  measurementId: "G-XW1LTJE3S2"
};


// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

// Initialize Firebase Auth
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Initialize Firestore
export const db = getFirestore();

// Create User Document in Firestore
export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // If user does not exist, create a new user document
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName: displayName || '',
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('Error creating user document', error.message);
    }
  }

  return userDocRef; // Return the document reference
}

// Function to create user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password);
}

// Function to sign in user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);
}