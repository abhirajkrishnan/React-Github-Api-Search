import { createSlice } from '@reduxjs/toolkit'
import data from '../mockdata/mockRepos'
import { PayloadAction } from '@reduxjs/toolkit';

export type Repos=typeof data

const initialState:Repos=data;


const repoSlice=createSlice({
    name:"repos",
    initialState,
    reducers:{
        repos:(state,action:PayloadAction<Repos>)=>state=action.payload
    }
})

export const {repos }= repoSlice.actions
export default repoSlice.reducer