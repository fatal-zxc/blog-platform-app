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
  }),
})

export const { useFetchArticlesQuery, useFetchArticleQuery } = blogAPI
