import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDD0u0rZgt34vAeR3uSS8dvUABMT-jj4sg",
  authDomain: "cloud-blog-platform.firebaseapp.com",
  projectId: "cloud-blog-platform",
  storageBucket: "cloud-blog-platform.firebasestorage.app",
  messagingSenderId: "72951524610",
  appId: "1:72951524610:web:1439ac8fd50b12a2b5a61b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;