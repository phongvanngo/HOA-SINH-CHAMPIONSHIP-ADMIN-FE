import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from './../../common/component/Notifier/notifierSlice';
import { examApi } from './ExamApi';

export const fetchExamRequest = createAsyncThunk(
    'exam/fetchExamStatus',
    async (thunkApi) => {
        const { dispatch } = thunkApi;
        console.log('fetchExamRequest');
        try {

            let response = await examApi.getExamData();
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Lấy dữ liệu thành công", options: { variant: 'success' } }));
                    return response.data;
                default:
                    throw new Error("unsuccessfully");
            }
        }
        catch (error) {
            console.log(error);
            dispatch(notify({ message: "Lỗi kết nối", options: { variant: 'error' } }));
            return null;
        }

    }
);

export const createExamRequest = createAsyncThunk(
    'exam/createExamStatus',
    async (thunkApi) => {
        const response = await examApi
    });

export const examSlice = createSlice({
    name: 'exam',
    initialState: {
        exam: []
    },

    reducers: {

    },

    extraReducers: {
        [fetchExamRequest.fulfilled]: (state, action) => {
            const response = action.payload;

        }
    }
})

// export const { } = examSlice.actions;

export default examSlice.reducer;