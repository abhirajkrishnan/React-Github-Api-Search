import { createSlice } from '@reduxjs/toolkit'
import data from '../mockdata/mockUser'


const initialState=data;

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        currentuser:(state)=>state
    }
})

export default userSlice.reducer