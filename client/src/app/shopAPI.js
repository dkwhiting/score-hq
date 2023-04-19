import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { retrieveData } from '../utils'

// Define a service using a base URL and expected endpoints
export const shopAPI = createApi({
  reducerPath: 'shopAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://172.31.183.210:8080/api',
    prepareHeaders: (headers) => {
      const token = retrieveData('token')
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['User', 'Games'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query(body) {
        return {
          url: 'users/login',
          method: 'POST',
          body
        }
      },
      providesTags: ['User'],
      invalidatesTags: ['User', 'Games']
    }),
    register: builder.mutation({
      query(body) {
        return {
          url: 'users/register',
          method: 'POST',
          body
        }
      },
      providesTags: ['User'],
      invalidatesTags: ['User', 'Games']
    }),
    // getAllGames: builder.query({
    //   query: (userId) => `games/${userId}`,
    //   providesTags: ['Games'],
    // }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation } = shopAPI