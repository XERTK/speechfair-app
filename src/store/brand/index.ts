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
import { BRAND_PATH } from '@/configs/constants';

export const brandsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      async queryFn({ body }: any) {
        try {
          const postsCollection = collection(db, BRAND_PATH);
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
    getBrands: builder.query({
      async queryFn(params) {
        try {
          const brandsCollection = collection(db, BRAND_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          const brandQuery = query(
            brandsCollection,
            orderBy('id'),
            where('id', '>=', params.search || ''),
            limit(params.limit),
            ...pagination
          );

          const resultsSnapshot = await getDocs(brandQuery);

          const results = resultsSnapshot.docs.map((brandDoc) => {
            const brandData = brandDoc.data();
            const id = brandDoc.id; // Retrieve the Firestore document ID

            return {
              ...brandData,
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
      providesTags: ['Brand'],
    }),
    updateBrand: builder.mutation({
      async queryFn({ id, body }: any) {
        try {
          await updateDoc(doc(db, BRAND_PATH, id), body);
          return { data: { message: 'Brand updated successfully' } };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Brand'],
    }),

    deleteBrand: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, BRAND_PATH, id));
          return { data: 'Document is Deleted successfully' };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Brand'],
    }),
    getBrand: builder.query({
      async queryFn(id: any) {
        try {
          const snapShot = await getDoc(doc(db, BRAND_PATH, id));
          const data = snapShot.data();
          return { data };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ['Brand'],
    }),
  }),
});

export const {
  useUpdateBrandMutation,
  useGetBrandsQuery,
  useGetBrandQuery,
  useDeleteBrandMutation,
  useCreateBrandMutation,
} = brandsApi;
