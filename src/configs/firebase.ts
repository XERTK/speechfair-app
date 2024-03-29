import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyAObGOnmqxNM7uycwBTUpN-dmItLd637qU',
  authDomain: 'speech-fair-f712b.firebaseapp.com',
  projectId: 'speech-fair-f712b',
  storageBucket: 'speech-fair-f712b.appspot.com',
  messagingSenderId: '586946134770',
  appId: '1:586946134770:web:1f8e395f38f1fde31b466b',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage(app);
