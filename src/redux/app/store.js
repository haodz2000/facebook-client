import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit";
import shareReducer from "~/redux/features/shareSlice"
import userReducer from "~/redux/features/userSlice"
import socketReducer from "~/redux/features/socketSlice"

export const store = configureStore({
    reducer:{
        share: shareReducer,
        user: userReducer,
        socket:socketReducer
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        }),
    ],
})