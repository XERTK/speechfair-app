import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';

const fakeBaseQuery: BaseQueryFn = async (arg, api, options) => {
  throw new Error(
    'When using `fakeBaseQuery`, all queries & mutations must use the `queryFn` definition syntax.'
  );
};

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
