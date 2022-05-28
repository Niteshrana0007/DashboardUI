import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAuth  } from 'firebase/auth'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/performance';

const firebaseConfig = {
  apiKey: "AIzaSyC5X29f-bi0ydvwcl4b3_JlRQk6v1eZe10",
  authDomain: "dreamguy-1fded.firebaseapp.com",
  projectId: "dreamguy-1fded",
  storageBucket: "dreamguy-1fded.appspot.com",
  messagingSenderId: "756055489873",
  appId: "1:756055489873:web:2d69f369ac6c4bdc0ea770",
  measurementId: "G-5Q42BHGKXT"
};

const Firebase = () => {
  if (typeof window !== undefined) {
      initializeApp(firebaseConfig);
      console.log("Firebase has been init successfully");
  }
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { Firebase, db, auth };
