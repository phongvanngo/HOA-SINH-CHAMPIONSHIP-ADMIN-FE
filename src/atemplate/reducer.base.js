import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from './../../common/component/Notifier/notifierSlice';
import { userApi } from './UserApi';
import { startLoading, stopLoading } from './../../common/component/PageLoader/loadingSlice';

export const fetchUserRequest = createAsyncThunk(
    'user/fetchUserStatus',
    async ({ }, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await userApi.getUserData();
            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Lấy dữ liệu thành công", options: { variant: 'success' } }));
                    return response.data;
                case 404:
                    throw new Error("Unauthorized");
                default:
                    throw new Error("Unsuccessfully");
            }
        }
        catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }

    }
);

export const createUserRequest = createAsyncThunk(
    'user/createUserStatus',
    async (userInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await userApi.pushNewUser(userInfo);
            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Thêm đề thi thành công", options: { variant: 'success' } }));
                    dispatch(stopLoading());
                    return { data: response.data, userInfo };
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const updateUserRequest = createAsyncThunk(
    'user/editUserStatus',
    async (userInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await userApi.patchUserInfo(userInfo);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Sửa đề thi thành công", options: { variant: 'success' } }));
                    return { data: response.data, userInfo };
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const deleteUserRequest = createAsyncThunk(
    'user/deleteUserStatus',
    async (user_id, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await userApi.deleteUser(user_id);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Xóa đề thi thành công", options: { variant: 'success' } }));
                    return user_id;
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        listUsers: [],
        userEditing: null
        // {
        //     id: null,
        //     user_name: "abc",
        //     user: 12,
        //     total_score: 123,
        // }
    },

    reducers: {
        closeUserFormDialog: state => {
            state.userEditing = null;
        },

        createUser: (state) => {
            state.userEditing = null;
        },

        editUser: (state, action) => {
            const userInfo = action.payload;
            state.userEditing = userInfo;
        }
    },

    extraReducers: {
        [fetchUserRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;
            let users = response_data;
            state.listUsers = [...users];

        },
        [createUserRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { data, userInfo } = response_data;
            const { id } = data;
            const newListUsers = [
                ...state.listUsers,
                {
                    ...userInfo,
                    available_user: 0,
                    id: id
                }
            ]
            state.listUsers = newListUsers;
        },
        [updateUserRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { userInfo } = response_data;
            console.log(userInfo);
            const newListUsers = state.listUsers.map((user) => {
                if (user.id === userInfo.id)
                    return {
                        ...user,
                        ...userInfo
                    }
                else
                    return { ...user };
            })

            state.listUsers = newListUsers;
        },
        [deleteUserRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;
            const user_id = response_data;

            const newListUsers = state.listUsers.filter((user) => user.id !== user_id);

            state.listUsers = newListUsers;
        }
    }
})

export const { closeUserFormDialog, createUser, editUser } = userSlice.actions;

export default userSlice.reducer;