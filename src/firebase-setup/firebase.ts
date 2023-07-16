import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4QWlAQPHGLWLkdvIoG29rdtCWc3V5ulw",
  authDomain: "parser-9da76.firebaseapp.com",
  projectId: "parser-9da76",
  storageBucket: "parser-9da76.appspot.com",
  messagingSenderId: "835019195930",
  appId: "1:835019195930:web:3d01bb6c89462566d233a3",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
export { app, auth, firestore, signOut };
