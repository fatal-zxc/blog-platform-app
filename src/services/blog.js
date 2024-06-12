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
      if (
        endpoint === 'loginUser' ||
        endpoint === 'registerUser' ||
        endpoint === 'updateUser' ||
        endpoint === 'createArticle' ||
        endpoint === 'updateArticle'
      ) {
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
      providesTags: ['Articles'],
    }),
    fetchArticle: build.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
      providesTags: ['Articles'],
    }),
    getUser: build.query({
      query: () => ({
        url: '/user',
      }),
      providesTags: ['User'],
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
      invalidatesTags: ['User'],
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
      invalidatesTags: ['Articles'],
    }),
    createArticle: build.mutation({
      query: (data) => ({
        url: '/articles',
        method: 'POST',
        body: {
          article: {
            title: data.title,
            description: data.description,
            body: data.text,
            tagList: data.tags,
          },
        },
      }),
      invalidatesTags: ['Articles'],
    }),
    favoriteArticle: build.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Articles'],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: '/user',
        method: 'PUT',
        body: {
          user: {
            email: data.email,
            username: data.username,
            image: data.avatar,
            password: data.password,
          },
        },
      }),
    }),
    updateArticle: build.mutation({
      query: (data) => ({
        url: `/articles/${data.slug}`,
        method: 'PUT',
        body: {
          article: {
            title: data.title,
            description: data.description,
            body: data.text,
            tagList: data.tags,
          },
        },
      }),
      invalidatesTags: ['Articles'],
    }),
    deleteArticle: build.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'],
    }),
    unfavoriteArticle: build.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
})

export const {
  useFetchArticlesQuery,
  useFetchArticleQuery,
  useLazyFetchArticleQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useCreateArticleMutation,
  useFavoriteArticleMutation,
  useUpdateUserMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useUnfavoriteArticleMutation,
} = blogAPI
