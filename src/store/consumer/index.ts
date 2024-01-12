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
} from 'firebase/firestore';
import { apiSlice } from '../api';
import db from '@/configs/firestore';
import { CONSUMER_PATH } from '@/configs/constants';

export const consumersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsumers: builder.query({
      async queryFn(params) {
        try {
          const consumersCollection = collection(db, CONSUMER_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          const consumerQuery = query(
            consumersCollection,
            orderBy('id'),
            where('id', '>=', params.search || ''),
            limit(params.limit),
            ...pagination
          );

          const resultsSnapshot = await getDocs(consumerQuery);

          const results = resultsSnapshot.docs.map((consumerDoc) => {
            const consumerData = consumerDoc.data();
            const id = consumerDoc.id; // Retrieve the Firestore document ID

            const serializedTimestamp = consumerData.timestamp
              .toDate()
              .toISOString();

            return {
              ...consumerData,
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
      providesTags: ['Consumer'],
    }),

    getConsumer: builder.query({
      async queryFn(id: any) {
        try {
          const snapShot = await getDoc(doc(db, CONSUMER_PATH, id));
          const data = snapShot.data();
          return { data };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ['Consumer'],
    }),
  }),
});

export const { useGetConsumersQuery, useGetConsumerQuery } =
  consumersApi;
