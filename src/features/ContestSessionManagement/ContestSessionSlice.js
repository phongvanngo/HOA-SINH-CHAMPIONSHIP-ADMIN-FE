import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from '../../common/component/Notifier/notifierSlice';
import { contestSessionApi } from './ContestSessionApi';
import { startLoading, stopLoading } from '../../common/component/PageLoader/loadingSlice';

export const fetchContestSessionRequest = createAsyncThunk(
    'contestSession/fetchContestSessionStatus',
    async ({ }, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await contestSessionApi.getContestSessionData();
            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Lấy dữ liệu ca thi thành công", options: { variant: 'success' } }));
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

export const createContestSessionRequest = createAsyncThunk(
    'contestSession/createContestSessionStatus',
    async (contestSessionInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            
            //transfer schema
            const {exam_id,name,type} = contestSessionInfo;
            const newContestSession =  {
                typeId : type,
                examId:exam_id,
                name:name,
            }
            
            const response = await contestSessionApi.pushNewContestSession(newContestSession);
            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Thêm đề thi thành công", options: { variant: 'success' } }));
                    dispatch(stopLoading());
                    return { data: response.data, contestSessionInfo };
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const updateContestSessionRequest = createAsyncThunk(
    'contestSession/editContestSessionStatus',
    async (contestSessionInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            
            const {exam_id,name,id} = contestSessionInfo;
            const newContestSession =  {
                examId:exam_id,
                name:name,
            }
            
            const response = await contestSessionApi.patchContestSessionInfo(newContestSession,id);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Sửa ca thi thành công", options: { variant: 'success' } }));
                    return { data: response.data, contestSessionInfo };
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const deleteContestSessionRequest = createAsyncThunk(
    'contestSession/deleteContestSessionStatus',
    async (question_id, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await contestSessionApi.deleteContestSession(question_id);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Xóa ca thi thành công", options: { variant: 'success' } }));
                    return question_id;
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });


export const activeContestSessionRequest = createAsyncThunk(
    'contestSession/activeContestSessionStatus',
    async (contest_session_id, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await contestSessionApi.activeContestSession(contest_session_id);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Mở ca thi thành công", options: { variant: 'success' } }));
                    return contest_session_id;
                case 401:
                    throw new Error("Đề thi chưa hoàn thành");
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });
export const deactiveContestSessionRequest = createAsyncThunk(
    'contestSession/deactiveContestSessionStatus',
    async (contest_session_id, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await contestSessionApi.deactiveContestSession(contest_session_id);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Đóng ca thi thành công", options: { variant: 'success' } }));
                    return contest_session_id;
                case 401:
                    throw new Error("Đề thi chưa hoàn thành");
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });
export const contestSessionSlice = createSlice({
    name: 'contestSession',
    initialState: {
        listContestSessions: [],
        isContestSessionDialogOpen: false,
        contestSessionEditing: null,
        // {
        //     id: null,
        //     contestSession_name: "abc",
        //     question: 12,
        //     total_score: 123,
        // }
        detailedChosenContestSession: null
    },

    reducers: {
        closeContestSessionFormDialog: state => {
            state.contestSessionEditing = null;
            state.isContestSessionDialogOpen = false;
        },

        createContestSession: (state) => {
            state.contestSessionEditing = null;
            state.isContestSessionDialogOpen = true;
        },

        editContestSession: (state, action) => {
            const contestSessionInfo = action.payload;
            console.log(contestSessionInfo);
            state.isContestSessionDialogOpen = true;
            state.contestSessionEditing = contestSessionInfo;
        },

        chooseContestSession: (state, action) => {
            const detailedChosenContestSession = action.payload;
            state.detailedChosenContestSession = detailedChosenContestSession;
        }
    },

    extraReducers: {
        [fetchContestSessionRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;
            let contestSessions = response_data.rows.map(element=>{
                const {id,name,isActive,examId,typeId} = element;
                return {
                    id:id,
                    name:name,
                    is_active:isActive,
                    type:typeId,
                    exam_id:examId
                }
            });
            state.listContestSessions = [...contestSessions];

        },
        [createContestSessionRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { data, contestSessionInfo } = response_data;
            const { id } = data;
            const newListContestSessions = [
                ...state.listContestSessions,
                {
                    ...contestSessionInfo,
                    available_question: 0,
                    id: id
                }
            ]
            state.listContestSessions = newListContestSessions;
        },
        [updateContestSessionRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { contestSessionInfo } = response_data;
            console.log(contestSessionInfo);
            const newListContestSessions = state.listContestSessions.map((contestSession) => {
                if (contestSession.id === contestSessionInfo.id)
                    return {
                        ...contestSession,
                        ...contestSessionInfo
                    }
                else
                    return { ...contestSession };
            })

            state.listContestSessions = newListContestSessions;
        },
        [activeContestSessionRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const contestSessionId = response_data;
            const newListContestSessions = state.listContestSessions.map((contestSession) => {
                if (contestSession.id === contestSessionId)
                    return {
                        ...contestSession,
                        is_active: true,
                    }
                else
                    return { ...contestSession };
            })

            state.listContestSessions = newListContestSessions;
        },
        [deactiveContestSessionRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const contestSessionId = response_data;
            const newListContestSessions = state.listContestSessions.map((contestSession) => {
                if (contestSession.id === contestSessionId)
                    return {
                        ...contestSession,
                        is_active: false,
                    }
                else
                    return { ...contestSession };
            })

            state.listContestSessions = newListContestSessions;
        },
        [deleteContestSessionRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;
            const question_id = response_data;

            const newListContestSessions = state.listContestSessions.filter((contestSession) => contestSession.id !== question_id);

            state.listContestSessions = newListContestSessions;
        }
    }
})

export const { chooseContestSession, closeContestSessionFormDialog, createContestSession, editContestSession } = contestSessionSlice.actions;

export default contestSessionSlice.reducer;