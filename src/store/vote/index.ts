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
import { VOTES_PATH } from '@/configs/constants';

export const votesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUpVotes: builder.query({
      async queryFn(params) {
        try {
          const votesCollection = collection(db, VOTES_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          const voteQuery = query(
            votesCollection,
            orderBy('value'),
            where('value', '==', true),
            limit(params.limit),
            ...pagination
          );

          const resultsSnapshot = await getDocs(voteQuery);

          const results = resultsSnapshot.docs.map((voteDoc) => {
            const voteData = voteDoc.data();
            const id = voteDoc.id; // Retrieve the Firestore document ID

            const serializedTimestamp = voteData.timestamp
              .toDate()
              .toISOString();

            return {
              ...voteData,
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
      providesTags: ['Vote'],
    }),
    getDownVotes: builder.query({
      async queryFn(params) {
        try {
          const votesCollection = collection(db, VOTES_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          const voteQuery = query(
            votesCollection,
            orderBy('value'),
            where('value', '==', false),
            limit(params.limit),
            ...pagination
          );

          const resultsSnapshot = await getDocs(voteQuery);

          const results = resultsSnapshot.docs.map((voteDoc) => {
            const voteData = voteDoc.data();
            const id = voteDoc.id; // Retrieve the Firestore document ID

            const serializedTimestamp = voteData.timestamp
              .toDate()
              .toISOString();

            return {
              ...voteData,
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
      providesTags: ['Vote'],
    }),

    getVote: builder.query({
      async queryFn(id: any) {
        try {
          const snapShot = await getDoc(doc(db, VOTES_PATH, id));
          const data = snapShot.data();
          return { data };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ['Vote'],
    }),
  }),
});

export const {
  useGetUpVotesQuery,
  useGetDownVotesQuery,
  useGetVoteQuery,
} = votesApi;
