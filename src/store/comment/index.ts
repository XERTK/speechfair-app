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
  arrayUnion,
} from 'firebase/firestore';
import { apiSlice } from '../api';
import db from '@/configs/firestore';
import { COMMENTS_PATH, POSTS_PATH } from '@/configs/constants';

export const commentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      async queryFn({ body }: any) {
        try {
          const commentsCollectionRef = collection(db, COMMENTS_PATH);

          const commentDocRef = doc(
            commentsCollectionRef,
            body.userId
          );

          const commentData = {
            ...body,
            timestamp: Date.now(),
          };

          const commentDoc = await getDoc(commentDocRef);

          if (commentDoc.exists()) {
            const existingData = commentDoc.data();
            if (
              existingData &&
              existingData.comments &&
              Array.isArray(existingData.comments)
            ) {
              if (
                !existingData.comments.some(
                  (comment: any) => comment.id === body.userId
                )
              ) {
                await updateDoc(commentDocRef, {
                  comments: arrayUnion(commentData),
                });
              }
            }
          } else {
            await setDoc(commentDocRef, {
              id: commentDocRef.id,
              comments: [commentData],
            });
          }

          return { data: { message: 'comment added successfully' } };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Comment'],
    }),

    getComments: builder.query({
      async queryFn(params) {
        try {
          const commentsCollection = collection(db, COMMENTS_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          const commentQuery = query(
            commentsCollection,
            orderBy('id'),
            where('id', '>=', params.search || ''),
            limit(params.limit),
            ...pagination
          );

          const resultsSnapshot = await getDocs(commentQuery);
          const results = resultsSnapshot.docs.map((commentDoc) => {
            const commentData: any = commentDoc.data();
            return {
              ...commentData,
            };
          });

          const totalResultsQuery = query(
            commentsCollection,
            where('id', '>=', params.search || '')
          );
          const totalResults = (
            await getCountFromServer(totalResultsQuery)
          ).data().count;

          const lastVisible =
            results.length > 0 ? results[results.length - 1].id : '';

          const newResults: any = results.map((commentDoc) => {
            const lastIndex = commentDoc.comments.length - 1; // Get the last index of the array
            let latestComment = null; // Initialize latestComment

            if (lastIndex >= 0) {
              latestComment = commentDoc.comments[lastIndex];
            } else {
              console.log('The array is empty');
            }
            return {
              ...commentDoc,
              Comment: latestComment,
            };
          });

          return {
            data: {
              results: newResults,
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
      providesTags: ['Comment'],
    }),

    getComment: builder.query({
      async queryFn(id: any) {
        try {
          const snapShot = await getDoc(doc(db, COMMENTS_PATH, id));
          const data = snapShot.data();
          return { data };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ['Comment'],
    }),

    updateComment: builder.mutation({
      async queryFn({ id, body }: any) {
        try {
          await updateDoc(doc(db, COMMENTS_PATH, id), body);
          return { data: { message: 'post updated successfully' } };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Comment'],
    }),

    deleteComment: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, COMMENTS_PATH, id));
          return { data: 'Document is Deleted successfully' };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useGetCommentQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
