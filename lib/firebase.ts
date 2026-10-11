import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDIWn-0JN7rekjjOe233FH8FoxENFijGLg",
    authDomain: "aqua-19e27.firebaseapp.com",
    databaseURL: "https://aqua-19e27-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "aqua-19e27",
    storageBucket: "aqua-19e27.firebasestorage.app",
    messagingSenderId: "944302251142",
    appId: "1:944302251142:web:89f48c5969628c54c20507"
};

const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);

export const database = getDatabase(app);