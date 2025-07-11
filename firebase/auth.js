import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAJMKJ-XrbhR4RxF4VDbELYIEG1Mrnb6i4',
  authDomain: 'ai-health-app-dd940.firebaseapp.com',
  projectId: 'ai-health-app-dd940',
  storageBucket: 'ai-health-app-dd940.appspot.com',
  messagingSenderId: '211028911688',
  appId: '1:211028911688:web:62dc6813cdd162a92cda7d',
  measurementId: 'G-NRW6CHGNC4'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export { auth };
