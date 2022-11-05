import { initializeApp } from 'firebase/app';

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDX7pJ-lRICK84s1j4zseG8Hl9Or2U9OL0",
    authDomain: "saamanstore-a27a7.firebaseapp.com",
    projectId: "saamanstore-a27a7",
    storageBucket: "saamanstore-a27a7.appspot.com",
    messagingSenderId: "812773983596",
    appId: "1:812773983596:web:f703eac961af607f0f9f49"
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDoc = async (collectionKey,objectsToAdd)=>{
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef,object.title.toUpperCase());
        batch.set(docRef,object)
    });
    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
        const {title,items} = docSnapshot.data();
        acc[title.toUpperCase()] = items;
        return acc;
    },{});

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        return userDocRef;
    }
}

export const createAuthUserWIthEmailAndPassword = async (email, password) => {
    if (!email && !password) return;
    return createUserWithEmailAndPassword(auth, email, password);
}

export const SignInAuthUserWithEmailAndPassword = async(email,password) => {
    if(!email && !password) return;
    return signInWithEmailAndPassword(auth,email,password);
}

export const SignOutUser = () => {
    return signOut(auth)
}

export const AuthStateChangedListener = (callaback) => {
    return onAuthStateChanged(auth,callaback);
}