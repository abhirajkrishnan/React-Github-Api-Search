import { configureStore } from '@reduxjs/toolkit'
import userdata from './features/data'

export const store = configureStore({
  reducer: {
    user:userdata,
  },
})

export type RootState=ReturnType<typeof store.getState>;