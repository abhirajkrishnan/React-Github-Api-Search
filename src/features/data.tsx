import { createSlice } from '@reduxjs/toolkit'
import data from '../mockdata/mockUser'
import { PayloadAction } from '@reduxjs/toolkit';
import { UserObject } from '../types';
const initialState:UserObject={};


const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        currentuser:(state,action:PayloadAction<UserObject>)=>state=action.payload
    }
})

export const {currentuser }= userSlice.actions
export default userSlice.reducer