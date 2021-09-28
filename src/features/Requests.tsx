import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';

const initialState:number=50;


const RequestSlice=createSlice({
    name:"Request",
    initialState,
    reducers:{
        requestleft:(state,action:PayloadAction<number>)=>state=action.payload
    }
})

export const {requestleft }= RequestSlice.actions
export default RequestSlice.reducer