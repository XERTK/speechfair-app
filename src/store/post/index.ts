import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  startAfter,
  doc,
  getCountFromServer,
  where,
  updateDoc,
  getDoc,
  setDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { apiSlice } from '../api';
import db from '@/configs/firestore';
import { POSTS_PATH } from '@/configs/constants';
import { id } from 'date-fns/locale';
import { log } from 'console';

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      async queryFn({ body }: any) {
        try {
          const postsCollection = collection(db, POSTS_PATH);
          const docRef = doc(postsCollection);
          console.log(docRef);
          const data = {
            id: docRef.id,
            ...body,
            timestamp: serverTimestamp(),
          };
          await setDoc(docRef, data);
          return { data: { message: 'post added successfully' } };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Post'],
    }),

    updatePost: builder.mutation({
      async queryFn({ id, body }: any) {
        try {
          await updateDoc(doc(db, POSTS_PATH, id), body);
          return { data: { message: 'post updated successfully' } };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Post'],
    }),

    getPosts: builder.query({
      async queryFn(params) {
        try {
          console.log(params.category, 'asfasdfas');
          const postsCollection = collection(db, POSTS_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          let postQuery = query(
            postsCollection,
            orderBy('id'),
            where('id', '>=', params.search || ''),
            limit(params.limit),
            ...pagination
          );

          if (params.categoryName) {
            postQuery = query(
              postsCollection,
              orderBy('category'),
              where('category.name', '==', params.categoryName || ''),
              limit(params.limit),
              ...pagination
            );
          }

          const resultsSnapshot = await getDocs(postQuery);
          const results = resultsSnapshot.docs.map((postDoc) => {
            const postData: any = postDoc.data();
            return {
              ...postData,
              timestamp: postData.timestamp.toDate().toISOString(), // Convert Timestamp to Date object or use the properties as needed
            };
          });

          const totalResultsQuery = query(
            postsCollection,
            where('id', '>=', params.search || '')
          );
          const totalResults = (
            await getCountFromServer(totalResultsQuery)
          ).data().count;

          const lastVisible =
            results.length > 0 ? results[results.length - 1].id : '';

          return {
            data: {
              results,
              totalResults,
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
      providesTags: ['Post'],
    }),

    getPost: builder.query({
      async queryFn(id: any) {
        try {
          const postsCollection = collection(db, POSTS_PATH);
          const postQuery = query(
            postsCollection,
            where('id', '==', id || '')
          );
          const resultsSnapshot = await getDocs(postQuery);
          let postData: any;
          resultsSnapshot.forEach((doc) => {
            postData = doc.data();
            postData.timestamp = postData.timestamp
              .toDate()
              .toISOString();
          });
          return {
            data: postData,
          };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ['Post'],
    }),

    deletePost: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, POSTS_PATH, id));
          return { data: 'Document is Deleted successfully' };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useUpdatePostMutation,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApi;
