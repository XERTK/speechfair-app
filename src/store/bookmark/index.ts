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
import { BOOKMARK_PATH } from '@/configs/constants';

export const bookmarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookmarks: builder.query({
      async queryFn(params) {
        try {
          const bookmarksCollection = collection(db, BOOKMARK_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          const bookmarkQuery = query(
            bookmarksCollection,
            orderBy('id'),
            where('id', '>=', params.search || ''),
            limit(params.limit),
            ...pagination
          );

          const resultsSnapshot = await getDocs(bookmarkQuery);

          const results = resultsSnapshot.docs.map((bookmarkDoc) => {
            const bookmarkData = bookmarkDoc.data();
            const id = bookmarkDoc.id; // Retrieve the Firestore document ID

            const serializedTimestamp = bookmarkData.timestamp
              .toDate()
              .toISOString();

            return {
              ...bookmarkData,
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
      providesTags: ['Bookmark'],
    }),

    getBookmark: builder.query({
      async queryFn(id: any) {
        try {
          const snapShot = await getDoc(doc(db, BOOKMARK_PATH, id));
          const data = snapShot.data();
          return { data };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ['Bookmark'],
    }),
  }),
});

export const { useGetBookmarksQuery, useGetBookmarkQuery } =
  bookmarksApi;
