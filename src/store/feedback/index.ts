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
import { FEEDBACK_PATH } from '@/configs/constants';

export const feedbacksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      async queryFn(params) {
        try {
          const feedbacksCollection = collection(db, FEEDBACK_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          const feedbackQuery = query(
            feedbacksCollection,
            orderBy('id'),
            where('id', '>=', params.search || ''),
            limit(params.limit),
            ...pagination
          );

          const resultsSnapshot = await getDocs(feedbackQuery);

          const results = resultsSnapshot.docs.map((feedbackDoc) => {
            const feedbackData = feedbackDoc.data();
            const id = feedbackDoc.id; // Retrieve the Firestore document ID

            const serializedTimestamp = feedbackData.timestamp
              .toDate()
              .toISOString();

            return {
              ...feedbackData,
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
      providesTags: ['Feedback'],
    }),

    getFeedback: builder.query({
      async queryFn(id: any) {
        try {
          const snapShot = await getDoc(doc(db, FEEDBACK_PATH, id));
          const data = snapShot.data();
          return { data };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ['Feedback'],
    }),
  }),
});

export const { useGetFeedbacksQuery, useGetFeedbackQuery } =
  feedbacksApi;
