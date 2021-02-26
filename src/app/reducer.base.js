//source sẵn

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginRequest = createAsyncThunk(
    'user/loginRequestStatus',
    async ({ }, thunkApi) => {
        return;
    }
)

export const notifierSlice = createSlice({
    name: 'login',
    initialState: {
        notifications: []
    },

    reducers: {
        enqueueSnackbar: (state, action) => {
            state.isLoggedIn = true;
        },

        closeSnackbar: (state, action) => {

        },

        removeSnackbar: (state, action) => {

        },
    },

    extraReducers: {
        [loginRequest.fulfilled]: (state, action) => {
            const response = action.payload;
        }
    }
})

export const { loginAgain, logout } = notifierSlice.actions;

export default notifierSlice.reducer;