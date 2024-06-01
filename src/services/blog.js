import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export const blogAPI = createApi({
  reducerPath: 'blogAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api',
    prepareHeaders: (headers, { endpoint }) => {
      const authToken = Cookies.get('authToken')
      if (authToken) {
        headers.set('Authorization', `Token ${authToken}`)
      }
      if (endpoint === 'loginUser' || endpoint === 'registerUser') {
        headers.set('Content-Type', 'application/json')
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    fetchArticles: build.query({
      query: (page) => ({
        url: '/articles',
        params: {
          limit: 5,
          offset: page * 5 - 5,
        },
      }),
    }),
    fetchArticle: build.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
    }),
    getUser: build.query({
      query: () => ({
        url: '/user',
      }),
    }),
    registerUser: build.mutation({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: {
          user: {
            username: data.username,
            email: data.email,
            password: data.password,
          },
        },
      }),
    }),
    loginUser: build.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: {
          user: {
            email: data.email,
            password: data.password,
          },
        },
      }),
    }),
  }),
})

export const {
  useFetchArticlesQuery,
  useFetchArticleQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = blogAPI
