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
import db from "src/config/firebaseFirestore"; // Ensure this is correctly pointing to your config file

import { apiSlice } from "./api.store.js";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      async queryFn(params) {
        try {
          console.log(params.limit);
          let q = query(collection(db, "users"), orderBy("uid"), limit(params.limit));
          if (params.lastVisible) {
            q = query(
              collection(db, "users"),
              orderBy("uid"),
              startAfter(params.lastVisible),
              limit(params.limit)
            );
          }
          const querySnapshot = await getDocs(q);
          return { data: querySnapshot };
        } catch (error) {
          console.error("Failed to fetch users:", error);
          return { error: { status: "API_ERROR", message: error.message } };
        }
      },
      providesTags: ["User"],
    }),

    // getUsers: builder.query({
    //   // since we are using fakeBaseQuery we use queryFn
    //   async queryFn() {
    //     try {
    //       // users is the collection name
    //       const blogRef = collection(db, "users");
    //       const querySnaphot = await getDocs(blogRef);
    //       let users = [];
    //       querySnaphot?.forEach((doc) => {
    //         users.push({ id: doc.id, ...doc.data() });
    //       });
    //       return { data: users };
    //     } catch (error) {
    //       return { error };
    //     }
    //   },
    //   providesTags: ["User"],
    // }),

    getUser: builder.query({
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
    deleteUser: builder.query({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "users", id));
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useDeleteUserQuery } = usersApi;
