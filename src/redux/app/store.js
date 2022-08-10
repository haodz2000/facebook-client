import { configureStore } from "@reduxjs/toolkit";
import shareReducer from "~/redux/features/shareSlice"
import userReducer from "~/redux/features/userSlice"

export const store = configureStore({
    reducer:{
        share: shareReducer,
        user: userReducer,
    }
})