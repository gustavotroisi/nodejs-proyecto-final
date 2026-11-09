import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../data/data.js";

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error al obtener colección products:`, error);
    throw error;
  }
};

export const getProductById = async (idDocumento) => {
  try {
    const docRef = doc(db, "products", idDocumento);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener documento con ID ${idDocumento}:`, error);
    throw error;
  }
};

export const saveProduct = async (product) => {
  await addDoc(productsCollection, product);
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(productsCollection, id));
};
