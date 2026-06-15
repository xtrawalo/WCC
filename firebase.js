import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDR0kwaxfkwtPxUSqTokznQt1vd5eKp8_g",
  authDomain: "theworldcupcountries.firebaseapp.com",
  projectId: "theworldcupcountries",
  storageBucket: "theworldcupcountries.firebasestorage.app",
  messagingSenderId: "885537503813",
  appId: "1:885537503813:web:e4115edfa3e101c3b3c12c",
  measurementId: "G-3DRTRTBH5K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };