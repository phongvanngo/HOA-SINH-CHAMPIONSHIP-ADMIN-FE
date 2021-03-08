import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from './../../common/component/Notifier/notifierSlice';
import { userApi } from './UserApi';
import { startLoading, stopLoading } from './../../common/component/PageLoader/loadingSlice';

export const fetchUserRequest = createAsyncThunk(
    'user/fetchUserStatus',
    async ({ page, pageSize, sessionID }, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await userApi.getUserData({ page, pageSize, sessionID });
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
        const { dispatch,getState } = thunkApi;
        try {
            dispatch(startLoading());
            const currentSessionId = getState().user.currentSessionID;
            userInfo ={...userInfo,sessionID:currentSessionId};

            //transfer schema
            const {sessionID,code,name} = userInfo;
            const newUser = {sessionId:sessionID,fullName:name,code:code};

            const response = await userApi.pushNewUser(newUser);
            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Tạo thí sinh thành công", options: { variant: 'success' } }));
                    dispatch(stopLoading());
                    return { data: response.data, userInfo };
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            console.log(error);
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

            //transfer schema
            const {id,name} = userInfo;
            const newUser = {fullName:name};


            const response = await userApi.patchUserInfo(newUser,id);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Cập nhật thành công", options: { variant: 'success' } }));
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
                    dispatch(notify({ message: "Xóa thí sinh thành công", options: { variant: 'success' } }));
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
        userEditing: null,
        currentSessionID: null,
        totalUsers: 0,
        isUserDialogOpen: false,
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
            state.isUserDialogOpen = false;
        },

        createUser: (state) => {
            state.userEditing = null;
        },

        editUser: (state, action) => {
            const userInfo = action.payload;
            state.userEditing = userInfo;
        },

        changeSession: (state, action) => {
            const currentSessionID = action.payload;
            state.currentSessionID = currentSessionID;
        },

        updateUser: (state, action) => {
            state.userEditing = action.payload;
            state.isUserDialogOpen = true;
        }
    },

    extraReducers: {
        [fetchUserRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;
            let { rows, count } = response_data;
            
            let users = rows.map(element=>{
                const {code,fullName,id,score,time} = element;
                return {
                    id:id,
                    code:code,
                    name:fullName,
                    score:score,
                    time:time
                }
             })
            
            state.totalUsers = count;
            state.listUsers = [...users];
        },

        [createUserRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { data, userInfo } = response_data;
            const { id } = data;
            const newListUsers = [
                {
                    ...userInfo,
                    available_user: 0,
                    id: id
                },
                ...state.listUsers,
            ]
            state.listUsers = newListUsers;
            state.totalUsers= state.totalUsers + 1;
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
            state.totalUsers= state.totalUsers - 1;

        }
    }
})

export const { updateUser, changeSession, closeUserFormDialog, createUser, editUser } = userSlice.actions;

export default userSlice.reducer;