import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogAPI = createApi({
  reducerPath: 'blogAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
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
  }),
})

export const { useFetchArticlesQuery, useFetchArticleQuery, useRegisterUserMutation } = blogAPI
