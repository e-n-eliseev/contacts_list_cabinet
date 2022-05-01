import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getAuth,
} from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBn8CtvyGz5EDgXZE7ea_CTDDmlimQz_0Y",
    authDomain: "contacts-list-d361c.firebaseapp.com",
    databaseURL: "https://contacts-list-d361c-default-rtdb.firebaseio.com",
    projectId: "contacts-list-d361c",
    storageBucket: "contacts-list-d361c.appspot.com",
    messagingSenderId: "756199246014",
    appId: "1:756199246014:web:82ad94d89844616f0876ef"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

export const signUp = async (email: string, pass: string) => {
    await createUserWithEmailAndPassword(auth, email, pass);
};
export const logIn = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
};
export const logOut = async () => {
    await signOut(auth);
};

export const getContactsRefById = (id: string) => ref(db, `contacts/${id}`);
export const getContactsListRefById = (id: string) => ref(db, `contacts/${id}/contactsList`);
export const getContactListRefById = (id: string, idFb: string) => ref(db, `contacts/${id}/contactsList/${idFb}`);