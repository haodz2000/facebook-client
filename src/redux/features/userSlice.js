import {createSlice} from "@reduxjs/toolkit"
import { storeItem, removeStoreItem } from "~/utils/storage";
const initialState = {
    isFetching: false,
    currentUser: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    error: false
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        loginStart: (state)=>{
            state.error = false;
            state.isFetching = true
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false
            storeItem("user",action.payload)
            state.currentUser = action.payload
        },
        loginFailure:(state)=>{
            state.isFetching= false
            state.error = true
        },
        logoutStart: (state)=>{
            state.error = false;
            state.isFetching = true
        },
        logoutSuccess: (state)=>{
            state.isFetching = false
            removeStoreItem("user")
            state.currentUser = null
        },
        logoutFailure: (state)=>{
            state.isFetching = false
            state.error = true
        },
        registerStart: (state)=>{
            state.error = false;
            state.isFetching = true
        },
        registerSuccess:(state, action)=>{
            state.isFetching = false
            storeItem("user",action.payload)
            state.currentUser = action.payload;
        },
        registerFailure:(state)=>{
            state.isFetching = false
            state.error = true
        }
    }
});

export const {
    loginStart,loginSuccess,loginFailure,
    logoutStart, logoutSuccess, logoutFailure,
    registerStart, registerSuccess, registerFailure
} = userSlice.actions;

export default userSlice.reducer;