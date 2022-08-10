import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
};

export const shareSlice = createSlice({
    name: 'share',
    initialState,
    reducers: {
        open: (state) => {
            state.open = true;
        },
        close: (state) => {
            state.open = false;
        },
    },
});

export const { open, close } = shareSlice.actions;

export default shareSlice.reducer;
