import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const shopAPI = createApi({
  reducerPath: 'shopAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem('token')
      if (token?.length > 0) {
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
    getAllGames: builder.query({
      query: (userId) => `games/${userId}`,
      providesTags: ['Games'],
    }),
    getSingleGame: builder.query({
      query: (gameId) => `games/userId/${gameId}`,
      providesTags: ['Games'],
    }),
    createNewGame: builder.mutation({
      query(body) {
        return {
          url: 'games',
          method: 'POST',
          body
        }
      },
      providesTags: ['User'],
      invalidatesTags: ['User', 'Games']
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation, useGetAllGamesQuery, useGetSingleGameQuery, useCreateNewGameMutation } = shopAPI