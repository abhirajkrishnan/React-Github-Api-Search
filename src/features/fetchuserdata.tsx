import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserObject } from '../types';
import Followers from '../mockdata/mockFollower'

export const githubSearchApi = createApi({
  reducerPath: 'githubSearchApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (builder) => ({
    getgithubUserByName: builder.query<UserObject, string>({
      query: (name) => `users/${name}`,
    }),
    getFollowers:builder.query<typeof Followers, string>({
      query: (name) => `users/${name}/followers?per_page=30`,
    }),
  }),
})

export const {useGetgithubUserByNameQuery,useGetFollowersQuery } = githubSearchApi