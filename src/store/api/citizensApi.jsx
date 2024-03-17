import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const citizensApi = createApi({
  reducerPath: 'citizensApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }), // Update base URL as per your backend API
  endpoints: (builder) => ({
    getCitizens: builder.query({
      query: () => '/citizens',
    }),
    getCitizenById: builder.query({
      query: (id) => `/citizens/${id}`,
    }),
    createCitizen: builder.mutation({
      query: (citizen) => ({
        url: `citizens`,
        method: 'POST',
        body: citizen,
      }),
    }),
    deleteCitizen: builder.mutation({
      query: (id) => (
        {
        url: `citizens/${id}`,
        method: 'DELETE',
      }),
    }),
    updateCitizen: builder.mutation({
      query: ({updatedCitizen,id}) => (
      {
        url: `citizens/${id}`,
        method: 'PUT',
        body: updatedCitizen,
      }),
    }),
  }),
});

export const {
  useGetCitizensQuery,
  useGetCitizenByIdQuery,
  useCreateCitizenMutation,
  useDeleteCitizenMutation,
  useUpdateCitizenMutation,
} = citizensApi;
