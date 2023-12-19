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
import { REGION_PATH } from '@/configs/constants';

export const regionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRegion: builder.mutation({
      async queryFn({ body }: any) {
        try {
          const postsCollection = collection(db, REGION_PATH);
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
    getRegions: builder.query({
      async queryFn(params) {
        try {
          const regionsCollection = collection(db, REGION_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          const regionQuery = query(
            regionsCollection,
            orderBy('id'),
            where('id', '>=', params.search || ''),
            limit(params.limit),
            ...pagination
          );

          const resultsSnapshot = await getDocs(regionQuery);

          const results = resultsSnapshot.docs.map((regionDoc) => {
            const regionData = regionDoc.data();
            const id = regionDoc.id; // Retrieve the Firestore document ID

            return {
              ...regionData,
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
      providesTags: ['Region'],
    }),
    updateRegion: builder.mutation({
      async queryFn({ id, body }: any) {
        try {
          await updateDoc(doc(db, REGION_PATH, id), body);
          return { data: { message: 'Region updated successfully' } };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Region'],
    }),

    deleteRegion: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, REGION_PATH, id));
          return { data: 'Document is Deleted successfully' };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Region'],
    }),
    getRegion: builder.query({
      async queryFn(id: any) {
        try {
          const snapShot = await getDoc(doc(db, REGION_PATH, id));
          const data = snapShot.data();
          return { data };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ['Region'],
    }),
  }),
});

export const {
  useUpdateRegionMutation,
  useGetRegionsQuery,
  useGetRegionQuery,
  useDeleteRegionMutation,
  useCreateRegionMutation,
} = regionsApi;
