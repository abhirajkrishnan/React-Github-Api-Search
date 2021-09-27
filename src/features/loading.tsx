import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';

const initialState:boolean=false;

const loadingSlice=createSlice({
    name:"loading",
    initialState,
    reducers:{
        loading:(state,action:PayloadAction<boolean>)=>state=action.payload
    }
})

export const { loading}=loadingSlice.actions
export default loadingSlice.reducer