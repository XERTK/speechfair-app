import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../../config/firebaseFirestore";
import { apiSlice } from "../api";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      // since we are using fakeBaseQuery we use queryFn
      async queryFn() {
        try {
          // users is the collection name
          const blogRef = collection(db, "users");
          const querySnaphot = await getDocs(blogRef);
          let users = [];
          querySnaphot?.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
          });
          return { data: users };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["User"],
    }),
    //***************SINGLE ITEM FETCHING*************** */
    fetchSingleUser: builder.query({
      async queryFn(id) {
        try {
          const docRef = doc(db, "users", id);
          const snapshot = await getDoc(docRef);
          return { data: snapshot.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useFetchUsersQuery, useFetchSingleUserQuery } = usersApi;
