import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Ratelimit, UserObject } from '../types';
import Followers from '../mockdata/mockFollower'
import {Repos} from "./repos"

export const githubSearchApi = createApi({
  reducerPath: 'githubSearchApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (builder) => ({
    getgithubUserByName: builder.query<UserObject, string>({
      query: (name) => `users/${name}`,
    }),
    getFollowers:builder.query<typeof Followers, string>({
      query: (name) => `users/${name}/followers?per_page=50`,
    }),
    requestleft:builder.query<Ratelimit,void>({
      query: () => `rate_limit`,
    }),
    repos:builder.query<Repos,string>({
      query: (name) => `users/${name}/repos`,
    }),
  }),
})

export const {useGetgithubUserByNameQuery,useGetFollowersQuery,useReposQuery,useRequestleftQuery } = githubSearchApi