import db from "src/config/firebaseFirestore";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  startAfter,
  doc,
} from "firebase/firestore";
import { createApi } from "@reduxjs/toolkit/query/react";

// Utility function to map documents from a querySnapshot
export const UserfetchDataDocs = async (querySnapshot) => {
  let users = [];

  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return { data: users };
};
