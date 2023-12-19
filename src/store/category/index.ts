import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  doc,
  where,
  getDoc,
  deleteDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { apiSlice } from '../api';
import db from '@/configs/firestore';
import { CATEGORY_PATH } from '@/configs/constants';

export const categorysApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      async queryFn({ body }: any) {
        try {
          const postsCollection = collection(db, CATEGORY_PATH);
          const docRef = doc(postsCollection);
          console.log(docRef);
          const data = {
            id: docRef.id,
            ...body,
          };
          await setDoc(docRef, data);
          return { data: { message: 'post added successfully' } };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Post'],
    }),
    getCategorys: builder.query({
      async queryFn(params) {
        try {
          const categorysCollection = collection(db, CATEGORY_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          const categoryQuery = query(
            categorysCollection,
            orderBy('id'),
            where('id', '>=', params.search || ''),
            limit(params.limit),
            ...pagination
          );

          const resultsSnapshot = await getDocs(categoryQuery);

          const results = resultsSnapshot.docs.map((categoryDoc) => {
            const categoryData = categoryDoc.data();
            const id = categoryDoc.id; // Retrieve the Firestore document ID

            return {
              ...categoryData,
              id,
            };
          });

          const lastVisible =
            results.length > 0 ? results[results.length - 1].id : '';

          return {
            data: {
              results: results,
              lastVisible,
            },
          };
        } catch (error: any) {
          console.error('Failed to fetch posts:', error);
          return {
            error: {
              status: 'API_ERROR',
              message: error.message,
            },
          };
        }
      },
      providesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      async queryFn({ id, body }: any) {
        try {
          await updateDoc(doc(db, CATEGORY_PATH, id), body);
          return {
            data: { message: 'Category updated successfully' },
          };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Category'],
    }),

    deleteCategory: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, CATEGORY_PATH, id));
          return { data: 'Document is Deleted successfully' };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Category'],
    }),
    getCategory: builder.query({
      async queryFn(id: any) {
        try {
          const snapShot = await getDoc(doc(db, CATEGORY_PATH, id));
          const data = snapShot.data();
          return { data };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ['Category'],
    }),
  }),
});

export const {
  useUpdateCategoryMutation,
  useGetCategorysQuery,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
} = categorysApi;
