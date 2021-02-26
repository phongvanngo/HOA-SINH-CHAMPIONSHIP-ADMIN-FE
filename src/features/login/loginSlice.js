import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginApi from './loginApi';
import { notify } from './../../common/component/Notifier/notifierSlice';

export const loginRequest = createAsyncThunk(
    'user/loginRequestStatus',
    async (loginInfo, thunkApi) => {
        const response = await loginApi.sendLoginInfo(loginInfo);
        thunkApi.dispatch(notify({ message: "Đăng nhập thành công", options: { variant: 'success' } }));
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