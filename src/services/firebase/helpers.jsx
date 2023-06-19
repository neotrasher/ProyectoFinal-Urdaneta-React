import  products  from "../../asyncMock";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBpNs2-KfmPn9JOp44x-hFaH5iuKLEV6rE",
    authDomain: "react-proyecto-final-360f7.firebaseapp.com",
    projectId: "react-proyecto-final-360f7",
    storageBucket: "react-proyecto-final-360f7.appspot.com",
    messagingSenderId: "918670059361",
    appId: "1:918670059361:web:14e6cfad56188084c14720"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
console.log(db);

export async function exportData() {
    const productsCollectionRef = collection(db, "products");

    for (let item of products) {
        item.index = item.id;
        delete item.id;
        const res = await addDoc(productsCollectionRef, item);
        console.log("Documento creado:", res.id);
    }
}