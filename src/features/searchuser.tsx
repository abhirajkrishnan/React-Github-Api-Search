import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';

const initialState:string="hnasr";


const searchSlice=createSlice({
    name:"SearchUser",
    initialState,
    reducers:{
        Searchuser:(state,action:PayloadAction<string>)=>state=action.payload
    }
})

export const {Searchuser}= searchSlice.actions
export default searchSlice.reducer