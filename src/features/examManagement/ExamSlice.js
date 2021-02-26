import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from './../../common/component/Notifier/notifierSlice';
import { examApi } from './ExamApi';

export const fetchExamRequest = createAsyncThunk(
    'exam/fetchExamStatus',
    async ({ }, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            let response = await examApi.getExamData();
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
            return null;
        }

    }
);

export const createExamRequest = createAsyncThunk(
    'exam/createExamStatus',
    async (thunkApi) => {
        console.log("hiiii");
        return null;
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

        },
        [createExamRequest.fulfilled]: (state, action) => {
            const response = action.payload;

        }
    }
})

// export const { } = examSlice.actions;

export default examSlice.reducer;