import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC9xeRR8PyTYzENOcQV6rAWloKYuG8GCK4",
//   authDomain: "notes-application-158dc.firebaseapp.com",
//   projectId: "notes-application-158dc",
//   storageBucket: "notes-application-158dc.appspot.com",
//   messagingSenderId: "867667331220",
//   appId: "1:867667331220:web:1be88a56794f1195c10c81"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
