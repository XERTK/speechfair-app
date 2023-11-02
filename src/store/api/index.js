import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query";

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
