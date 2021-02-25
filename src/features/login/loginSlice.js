import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginApi from './loginApi';

export const loginRequest = createAsyncThunk(
    'user/loginRequestStatus',
    async (loginInfo, thunkApi) => {
        console.log("response");
        const response = await loginApi.sendLoginInfo(loginInfo);
        return response;
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        idToken: null
    },

    reducers: {
        loginAgain: state => {
            state.isLoggedIn = true;
        },

        logOut: state => {
            window.localStorage.removeItem('id_token');
            state.isLoggedIn = false;
        },
    },

    extraReducers: {
        [loginRequest.fulfilled]: (state, action) => {
            const response = action.payload;
            console.log("logged in");
            localStorage.setItem('id_token', response.data.token);
            state.isLoggedIn = true;
        }
    }
})

export const { loginAgain, logout } = loginSlice.actions;

export default loginSlice.reducer;