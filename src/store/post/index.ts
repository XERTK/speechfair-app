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
} from 'firebase/firestore';
import { apiSlice } from '../api';
import db from '@/configs/firestore';
import { POSTS_PATH } from '@/configs/constants';
import { id } from 'date-fns/locale';
import { log } from 'console';

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      async queryFn(params) {
        try {
          const postsCollection = collection(db, POSTS_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          const postQuery = query(
            postsCollection
            // orderBy('id'),
            // where('uid', '>=', params.search || '')
            // limit(params.limit),
            // ...pagination
          );

          const resultsSnapshot = await getDocs(postQuery);
          const results = resultsSnapshot.docs.map((postDoc) => ({
            id: postDoc.id,
            ...postDoc.data(),
          }));
          console.log(resultsSnapshot);

          // const totalResultsQuery = query(
          //   postsCollection,
          //   where('headline', '>=', params.search || '')
          // );
          // const totalResults = (
          //   await getCountFromServer(totalResultsQuery)
          // ).data().count;

          // const lastVisible =
          //   results.length > 0 ? results[results.length - 1].id : '';

          return {
            data: {
              results,
              // totalResults,
              // lastVisible,
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
          const snapShot = await getDoc(doc(db, POSTS_PATH, id));
          const data = snapShot.data();
          return { data };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      async queryFn({ id, body }: any) {
        try {
          const data = await updateDoc(doc(db, POSTS_PATH, id), body);
          console.log(data);
          return { data: body };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Post'],
    }),
    createPost: builder.mutation({
      async queryFn({ body }: any) {
        try {
          console.log(body);
          const postsCollection = collection(db, POSTS_PATH);
          const docRef = await addDoc(postsCollection, body);
          return { data: docRef };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Post'],
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
