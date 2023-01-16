import { configureStore } from '@reduxjs/toolkit'
import userdata from '../features/data'
import { githubSearchApi } from '../features/fetchuserdata';
import loading from '../features/loading'
import searchuser from '../features/searchuser';
import followers from '../features/followersdata';
import Requestleft from '../features/Requests';
import Repos from '../features/repos'
import currentLoggedInUser  from '../features/currentUser';

export const store = configureStore({
  reducer: {
    user:userdata,
    followers:followers,
    loader:loading,
    searchuser:searchuser,
    Requestleft,
    Repos,
    currentLoggedInUser,
    [githubSearchApi.reducerPath]:githubSearchApi.reducer
  },
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(githubSearchApi.middleware)
  }
})

export type AppDispatch=typeof store.dispatch;
export type RootState=ReturnType<typeof store.getState>;