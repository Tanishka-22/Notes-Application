import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9xeRR8PyTYzENOcQV6rAWloKYuG8GCK4",
  authDomain: "notes-application-158dc.firebaseapp.com",
  projectId: "notes-application-158dc",
  storageBucket: "notes-application-158dc.appspot.com",
  messagingSenderId: "867667331220",
  appId: "1:867667331220:web:1be88a56794f1195c10c81"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const notesCollection = collection(db, "notes")

export { db, notesCollection };