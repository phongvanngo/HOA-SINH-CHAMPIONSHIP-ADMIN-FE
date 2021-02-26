import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginApi from './loginApi';
import { notistack_config } from './../../common/notitask.config';

export const loginRequest = createAsyncThunk(
    'user/loginRequestStatus',
    async ({ loginInfo, enqueueSnackbar }, thunkApi) => {
        const response = await loginApi.sendLoginInfo(loginInfo);
        enqueueSnackbar('Đăng nhập thành công!', notistack_config('success'))
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

        logout: state => {
            window.localStorage.removeItem('id_token');
            state.isLoggedIn = false;
        },
    },

    extraReducers: {
        [loginRequest.fulfilled]: (state, action) => {
            const response = action.payload;
            localStorage.setItem('id_token', response.data.token);
            state.isLoggedIn = true;
        }
    }
})

export const { loginAgain, logout } = loginSlice.actions;

export default loginSlice.reducer;