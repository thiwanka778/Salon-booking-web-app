
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyCWM-DpQga6oek0-BTa_kJ5uZ9w2gmN0MQ",
  authDomain: "salon-app-216ab.firebaseapp.com",
  projectId: "salon-app-216ab",
  storageBucket: "salon-app-216ab.appspot.com",
  messagingSenderId: "127114224690",
  appId: "1:127114224690:web:fe39a3dfde22b042dec82b"
};


const app = initializeApp(firebaseConfig);
 export const storage=getStorage(app);
export const auth=getAuth(app);
