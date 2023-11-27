import { AUTH_URL, USERS_PATH } from '@/configs/constants';
import { apiSlice } from '../api';
import { doc, getDoc } from 'firebase/firestore';
import db from '@/configs/firestore';

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      async queryFn() {
        try {
          const user = JSON.parse(localStorage.getItem('user') || '');

          const userDocRef = doc(db, USERS_PATH, user.uid);
          const snapShot = await getDoc(userDocRef);

          if (snapShot.exists()) {
            const data = snapShot.data();
            return { data };
          } else {
            console.log('Document does not exist.');
            return { error: 'Document does not exist' };
          }
        } catch (error: any) {
          console.error('Error fetching document:', error);
          return { error };
        }
      },
      providesTags: ['User'],
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: `${AUTH_URL}/login`,
          method: 'POST',
          body: body,
        };
      },
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation } = authSlice;
