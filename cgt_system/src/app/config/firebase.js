import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAI6njYxuiOrMjsLXzoDm0VbeYI0Q_YkJE",
  authDomain: "child-growth-tracking-system.firebaseapp.com",
  projectId: "child-growth-tracking-system",
  storageBucket: "child-growth-tracking-system.firebasestorage.app",
  messagingSenderId: "441722398394",
  appId: "1:441722398394:web:086355da7734e4f0930483",
  measurementId: "G-FNHMYXB9NE",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export { db, auth, provider, storage };
