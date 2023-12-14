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
import { COMMENTS_PATH } from '@/configs/constants';
import { v4 as uuidv4 } from 'uuid'; // Import a library for generating UUIDs

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

          const newDocRef = doc(commentsCollectionRef); // Create a reference to a new document
          console.log(newDocRef.id);

          await setDoc(newDocRef, {
            // Use newDocRef here instead of doc(commentsCollectionRef)
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
    // createReply: builder.mutation({
    //   async queryFn({ body }: any) {
    //     try {
    //       const { name, userId, commentId, reply } = body;

    //       console.log(commentId);
    //       const commentDocRef = doc(db, COMMENTS_PATH, commentId);
    //       const commentDocSnapshot = await getDoc(commentDocRef);

    //       if (commentDocSnapshot.exists()) {
    //         const commentData = commentDocSnapshot.data();

    //         const newReply = {
    //           replyId: uuidv4(),
    //           name,
    //           userId,
    //           text: reply,
    //           reply: { replies: [] },
    //           timestamp: Date.now(),
    //         };
    //         if (!commentData.replies) {
    //           commentData.replies = [newReply];
    //         } else {
    //           commentData.replies.push(newReply);
    //         }

    //         await setDoc(commentDocRef, commentData);

    //         return { data: { message: 'Reply added successfully' } };
    //       } else {
    //         console.error('Error: Comment not found');
    //         return { error: 'Comment not found' };
    //       }
    //     } catch (error: any) {
    //       console.log(error);
    //       return { error };
    //     }
    //   },
    //   invalidatesTags: ['Comment'],
    // }),

    // createReply: builder.mutation({
    //   async queryFn({ body }: any) {
    //     try {
    //       const { name, userId, commentId, reply } = body;
    //       const replyId = '723ad19e-4186-4500-9afd-9d489f85bffa';
    //       const commentDocRef = doc(db, COMMENTS_PATH, commentId);
    //       const commentDocSnapshot = await getDoc(commentDocRef);

    //       if (commentDocSnapshot.exists()) {
    //         const commentData = commentDocSnapshot.data();

    //         // Check if replyId is provided in the body
    //         if (replyId) {
    //           // Search for a match in existing replies for the provided replyId
    //           const replyToUpdate = commentData.replies?.find(
    //             (replyItem: any) => replyItem.replyId === replyId
    //           );

    //           if (replyToUpdate) {
    //             const newReply = {
    //               replyId: uuidv4(),
    //               name,
    //               userId,
    //               text: reply,
    //               timestamp: Date.now(),
    //             };

    //             // Check if the replyToUpdate already has a replies array
    //             if (!replyToUpdate.replies) {
    //               replyToUpdate.replies = [newReply];
    //             } else {
    //               replyToUpdate.replies.push(newReply);
    //             }

    //             await setDoc(commentDocRef, commentData);

    //             return {
    //               data: { message: 'Reply added successfully' },
    //             };
    //           } else {
    //             console.error('Error: Reply not found');
    //             return { error: 'Reply not found' };
    //           }
    //         } else {
    //           try {
    //             // const { name, userId, commentId, reply } = body;

    //             console.log(commentId);
    //             const commentDocRef = doc(
    //               db,
    //               COMMENTS_PATH,
    //               commentId
    //             );
    //             const commentDocSnapshot = await getDoc(
    //               commentDocRef
    //             );

    //             if (commentDocSnapshot.exists()) {
    //               const commentData = commentDocSnapshot.data();

    //               const newReply = {
    //                 replyId: uuidv4(),
    //                 name,
    //                 userId,
    //                 text: reply,
    //                 reply: { replies: [] },
    //                 timestamp: Date.now(),
    //               };
    //               if (!commentData.replies) {
    //                 commentData.replies = [newReply];
    //               } else {
    //                 commentData.replies.push(newReply);
    //               }

    //               await setDoc(commentDocRef, commentData);

    //               return {
    //                 data: { message: 'Reply added successfully' },
    //               };
    //             } else {
    //               console.error('Error: Comment not found');
    //               return { error: 'Comment not found' };
    //             }
    //           } catch (error: any) {
    //             console.log(error);
    //             return { error };
    //           }

    //           console.error('Error: replyId not provided');
    //           return { error: 'replyId not provided' };
    //         }
    //       } else {
    //         console.error('Error: Comment not found');
    //         return { error: 'Comment not found' };
    //       }
    //     } catch (error: any) {
    //       console.log(error);
    //       return { error };
    //     }
    //   },
    //   invalidatesTags: ['Comment'],
    // }),

    createReply: builder.mutation({
      async queryFn({ body }: any) {
        try {
          const { name, userId, commentId, reply, replyId } = body;
          console.log(reply.replyId, 'hello from the slice ');
          // const replyId = '0237524b-b742-4fce-bdc3-428132f2535a'; // Example replyId
          const commentDocRef = doc(db, COMMENTS_PATH, commentId);
          const commentDocSnapshot = await getDoc(commentDocRef);

          if (commentDocSnapshot.exists()) {
            const commentData = commentDocSnapshot.data();

            const findAndAddReply = (
              replies: any[],
              parentId: string
            ) => {
              for (const replyItem of replies) {
                if (replyItem.replyId === parentId) {
                  const newReply = {
                    replyId: uuidv4(),
                    name,
                    userId,
                    text: reply,
                    timestamp: Date.now(),
                  };

                  if (!replyItem.replies) {
                    replyItem.replies = [newReply];
                  } else {
                    replyItem.replies.push(newReply);
                  }

                  return true; // Reply added successfully
                } else if (replyItem.replies) {
                  const found = findAndAddReply(
                    replyItem.replies,
                    parentId
                  );
                  if (found) return true; // Exit loop if reply is added
                }
              }
              return false; // Reply not found
            };

            if (replyId) {
              const added = findAndAddReply(
                commentData.replies || [],
                replyId
              );

              if (added) {
                await setDoc(commentDocRef, commentData);
                return {
                  data: { message: 'Reply added successfully' },
                };
              } else {
                console.error('Error: Reply not found');
                return { error: 'Reply not found' };
              }
            } else {
              try {
                // const { name, userId, commentId, reply } = body;

                console.log(commentId);
                const commentDocRef = doc(
                  db,
                  COMMENTS_PATH,
                  commentId
                );
                const commentDocSnapshot = await getDoc(
                  commentDocRef
                );

                if (commentDocSnapshot.exists()) {
                  const commentData = commentDocSnapshot.data();

                  const newReply = {
                    replyId: uuidv4(),
                    name,
                    userId,
                    text: reply,
                    timestamp: Date.now(),
                  };
                  if (!commentData.replies) {
                    commentData.replies = [newReply];
                  } else {
                    commentData.replies.push(newReply);
                  }

                  await setDoc(commentDocRef, commentData);

                  return {
                    data: { message: 'Reply added successfully' },
                  };
                } else {
                  console.error('Error: Comment not found');
                  return { error: 'Comment not found' };
                }
              } catch (error: any) {
                console.log(error);
                return { error };
              }
            }
          } else {
            console.error('Error: Comment not found');
            return { error: 'Comment not found' };
          }
        } catch (error: any) {
          console.log(error);
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
