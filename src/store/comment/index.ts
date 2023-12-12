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
  arrayUnion,
  getDocFromServer,
  addDoc,
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

          const commentData = {
            ...body,
            timestamp: Date.now(),
          };

          const newDocRef = doc(commentsCollectionRef);

          await setDoc(doc(commentsCollectionRef), {
            postId: commentData.postId,
            userId: commentData.userId,
            comments: [commentData],
            id: newDocRef.id,
          });

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

    getPostComments: builder.query({
      async queryFn(params) {
        try {
          const commentsCollection = collection(db, COMMENTS_PATH);
          const commentQuery = query(
            commentsCollection,
            where('postId', '==', params.postId)
          );

          const resultsSnapshot = await getDocs(commentQuery);
          const results = resultsSnapshot.docs.map((commentDoc) => {
            const commentData: any = commentDoc.data();
            return {
              ...commentData,
            };
          });

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
          const commentsCollectionRef = collection(db, COMMENTS_PATH);
          const querySnapshot = await getDocs(
            query(
              commentsCollectionRef,
              where('userId', '==', body.userId),
              where('postId', '==', body.postId),
              limit(1)
            )
          );

          const commentData = {
            ...body,
            timestamp: Date.now(),
          };

          if (querySnapshot.size > 0) {
            // Document with userId and postId exists, update comments if needed
            const existingDoc = querySnapshot.docs[0];
            const existingData = existingDoc.data();

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
                await updateDoc(existingDoc.ref, {
                  comments: arrayUnion(commentData),
                });
              }
            }
            return {
              data: { message: 'Comment updated successfully' },
            };
          } else {
            // Document doesn't exist, cannot update
            return {
              data: {
                message: 'Cannot update. Comment does not exist',
              },
            };
          }
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
    getPostCommentsCount: builder.query({
      async queryFn(params) {
        try {
          const commentsCollection = collection(db, COMMENTS_PATH);

          const totalResultsQuery = query(
            commentsCollection,
            where('postId', '==', params.postId)
          );
          const totalResults = (
            await getCountFromServer(totalResultsQuery)
          ).data().count;

          return {
            data: {
              commentCount: totalResults,
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
    createReply: builder.mutation({
      async queryFn({ body }: any) {
        try {
          const commentsCollectionRef = collection(db, COMMENTS_PATH);

          const { name, userId, commentId, reply } = body;

          const commentDocRef = doc(commentsCollectionRef, commentId);
          const commentDocSnapshot = await getDoc(commentDocRef);

          if (commentDocSnapshot.exists()) {
            const repliesCollectionRef = collection(
              commentDocRef,
              'replies'
            );

            // Add a new document to the replies subcollection
            await addDoc(repliesCollectionRef, {
              name,
              userId,
              reply,
              timestamp: Date.now(),
            });

            return { data: { message: 'Reply added successfully' } };
          } else {
            return { error: 'Comment not found' };
          }
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
  useGetPostCommentsQuery,
  useGetPostCommentsCountQuery,
  useGetCommentQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useCreateReplyMutation,
} = commentsApi;
