import { db } from "./firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

// Add a new listing
export async function addListing({ name, price, owner }) {
  return await addDoc(collection(db, "listings"), {
    name,
    price,
    owner,
    createdAt: serverTimestamp()
  });
}

// Get all listings
export async function getListings() {
  const snapshot = await getDocs(collection(db, "listings"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}