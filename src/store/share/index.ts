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
} from 'firebase/firestore';
import { apiSlice } from '../api';
import db from '@/configs/firestore';
import { SHARE_PATH } from '@/configs/constants';

export const sharesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShares: builder.query({
      async queryFn(params) {
        try {
          const sharesCollection = collection(db, SHARE_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          const shareQuery = query(
            sharesCollection,
            orderBy('id'),
            where('id', '>=', params.search || ''),
            limit(params.limit),
            ...pagination
          );

          const resultsSnapshot = await getDocs(shareQuery);

          const results = resultsSnapshot.docs.map((shareDoc) => {
            const shareData = shareDoc.data();
            const id = shareDoc.id; // Retrieve the Firestore document ID

            const serializedTimestamp = shareData.timestamp
              .toDate()
              .toISOString();

            return {
              ...shareData,
              id,
              timestamp: serializedTimestamp, // Replace the timestamp with the serialized value
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
      providesTags: ['Share'],
    }),

    getShare: builder.query({
      async queryFn(id: any) {
        try {
          const snapShot = await getDoc(doc(db, SHARE_PATH, id));
          const data = snapShot.data();
          return { data };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ['Share'],
    }),
    deleteShare: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, SHARE_PATH, id));
          return { data: 'Document is Deleted successfully' };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Share'],
    }),
  }),
});

export const {
  useGetSharesQuery,
  useGetShareQuery,
  useDeleteShareMutation,
} = sharesApi;
