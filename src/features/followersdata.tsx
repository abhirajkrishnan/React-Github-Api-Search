import { createSlice } from '@reduxjs/toolkit'
import data from '../mockdata/mockFollower'
import { PayloadAction } from '@reduxjs/toolkit';
import {FollowersType} from '../types'


const initialState:FollowersType=data;


const followerSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        followers:(state,action:PayloadAction<FollowersType>)=>state=action.payload
    }
})

export const { followers}= followerSlice.actions
export default followerSlice.reducer