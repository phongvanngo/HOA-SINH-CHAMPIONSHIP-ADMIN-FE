import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginApi from './loginApi';
import { notify } from './../../common/component/Notifier/notifierSlice';
import { startLoading, stopLoading } from './../../common/component/PageLoader/loadingSlice';

export const loginRequest = createAsyncThunk(
    'user/loginRequestStatus',
    async (loginInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        dispatch(startLoading());
        try {
            const response = await loginApi.sendLoginInfo(loginInfo);
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Đăng nhập thành công", options: { variant: 'success' } }));
                    dispatch(stopLoading());
                    return response.data;
                case 401:
                    throw new Error("Sai tên đăng nhập hoặc mật khẩu");
                case 400:
                    throw new Error("Chưa nhập tên đăng nhập và mật khẩu");
                default:
                    throw new Error("Failed");
            }
        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
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
            const data = action.payload;
            console.log(data);
            if (data === null) return;
            localStorage.setItem("id_token", data.token);
            state.isLoggedIn = true;
        }
    }
})

export const { loginAgain, logout } = loginSlice.actions;

export default loginSlice.reducer;