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
import comments from '@/pages/admin/comments';

export const commentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      async queryFn({ body }: any) {
        try {
          const postRef = doc(db, POSTS_PATH, 'kzcPiLwcIjPpU34NEl5q');

          const commentsCollectionRef = collection(
            postRef,
            COMMENTS_PATH
          );

          const commentDocRef = doc(
            commentsCollectionRef,
            body.userId
          );

          const commentData = {
            ...body,
            timestamp: new Date(),
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
            await setDoc(commentDocRef, { comments: [commentData] });
          }

          return { data: { message: 'comment added successfully' } };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['Post'],
    }),

    getComments: builder.query({
      async queryFn(params) {
        try {
          const postsSnapshot = await getDocs(
            collection(db, POSTS_PATH)
          );
          const allComments: any = [];

          for (const postDoc of postsSnapshot.docs) {
            const commentsCollection = collection(
              doc(db, POSTS_PATH, postDoc.id),
              COMMENTS_PATH
            );

            const commentsSnapshot = await getDocs(
              commentsCollection
            );
            commentsSnapshot.docs.forEach((commentDoc) => {
              const commentData = commentDoc.data();
              allComments.push(commentData);
            });
          }

          return {
            data: {
              results: allComments,
            },
          };
        } catch (error: any) {
          console.error('Failed to fetch comments:', error);
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
          await updateDoc(doc(db, POSTS_PATH, id), body);
          return { data: { message: 'post updated successfully' } };
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
  useCreateCommentMutation,
  useGetCommentsQuery,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = commentsApi;
