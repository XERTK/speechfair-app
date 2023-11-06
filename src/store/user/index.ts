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
} from 'firebase/firestore';
import { apiSlice } from '../api';
import db from '@/configs/firestore';
import { USERS_PATH } from '@/configs/constants';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      async queryFn(params) {
        try {
          console.log('Fetching users with params:', params);
          const usersCollection = collection(db, USERS_PATH);
          const pagination = params.lastVisible
            ? [startAfter(params.lastVisible)]
            : [];

          const userQuery = query(
            usersCollection,
            orderBy('email'),
            where('email', '>=', params.search || ''),
            limit(params.limit),
            ...pagination
          );

          const resultsSnapshot = await getDocs(userQuery);
          const results = resultsSnapshot.docs.map((userDoc) => ({
            id: userDoc.id,
            ...userDoc.data(),
          }));

          const totalResultsQuery = query(
            usersCollection,
            where('email', '>=', params.search || '')
          );
          const totalResults = (
            await getCountFromServer(totalResultsQuery)
          ).data().count;

          const lastVisible =
            results.length > 0 ? results[results.length - 1].id : '';
          console.log('Fetched users successfully:', {
            results,
            totalResults,
            lastVisible,
          });
          return {
            data: {
              results,
              totalResults,
              lastVisible,
            },
          };
        } catch (error: any) {
          console.error('Failed to fetch users:', error);
          return {
            error: {
              status: 'API_ERROR',
              message: error.message,
            },
          };
        }
      },
      providesTags: ['User'],
    }),
    getUser: builder.query({
      async queryFn(id) {
        try {
          return { data: '' };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: ['User'],
    }),
    createUser: builder.mutation({
      async queryFn(body) {
        try {
          return { data: '' };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      async queryFn({ id, body }) {
        try {
          return { data: '' };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, USERS_PATH, id));
          return { data: '' };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
