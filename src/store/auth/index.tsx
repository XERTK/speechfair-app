import { AUTH_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: `${AUTH_URL}/me`,
      }),
      keepUnusedDataFor: 5,
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

export const { useGetMeQuery, useLoginMutation } = userSlice;
