import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    socket: null,
    online:[]
}
export const socketSlice = createSlice({
    name:"socket",
    initialState,
    reducers:{
        connect:(state,action)=>{
            state.socket = action.payload.current
        },
        disconnect:(state)=>{

        },
        getOnline:(state,action)=>{
            state.online = action.payload
        }
    }
})
export const {
    connect,disconnect, getOnline
} = socketSlice.actions;

export default socketSlice.reducer;