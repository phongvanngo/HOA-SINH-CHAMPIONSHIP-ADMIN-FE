import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from './../../common/component/Notifier/notifierSlice';
import { examApi } from './ExamApi';
import { startLoading, stopLoading } from './../../common/component/PageLoader/loadingSlice';

export const fetchExamRequest = createAsyncThunk(
    'exam/fetchExamStatus',
    async ({ }, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await examApi.getExamData();
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

export const createExamRequest = createAsyncThunk(
    'exam/createExamStatus',
    async (examInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await examApi.pushNewExam(examInfo);
            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Thêm đề thi thành công", options: { variant: 'success' } }));
                    dispatch(stopLoading());
                    return { data: response.data, examInfo };
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const updateExamRequest = createAsyncThunk(
    'exam/editExamStatus',
    async (examInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await examApi.patchExamInfo(examInfo);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Sửa đề thi thành công", options: { variant: 'success' } }));
                    return { data: response.data, examInfo };
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const deleteExamRequest = createAsyncThunk(
    'exam/deleteExamStatus',
    async (question_id, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await examApi.deleteExam(question_id);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Xóa đề thi thành công", options: { variant: 'success' } }));
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

export const examSlice = createSlice({
    name: 'exam',
    initialState: {
        listExams: [],
        isExamDialogOpen: false,
        examEditing: null,
        // {
        //     id: null,
        //     exam_name: "abc",
        //     question: 12,
        //     total_score: 123,
        // }
        detailedChosenExam: null
    },

    reducers: {
        closeExamFormDialog: state => {
            state.examEditing = null;
            state.isExamDialogOpen = false;
        },

        createExam: (state) => {
            state.examEditing = null;
            state.isExamDialogOpen = true;
        },

        editExam: (state, action) => {
            const examInfo = action.payload;
            console.log(examInfo);
            state.isExamDialogOpen = true;
            state.examEditing = examInfo;
        },

        chooseExam: (state, action) => {
            const detailedChosenExam = action.payload;
            state.detailedChosenExam = detailedChosenExam;
        }
    },

    extraReducers: {
        [fetchExamRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;
            let exams = response_data;
            state.listExams = [...exams];

        },
        [createExamRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { data, examInfo } = response_data;
            const { id } = data;
            const newListExams = [
                ...state.listExams,
                {
                    ...examInfo,
                    available_question: 0,
                    id: id
                }
            ]
            state.listExams = newListExams;
        },
        [updateExamRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { examInfo } = response_data;
            console.log(examInfo);
            const newListExams = state.listExams.map((exam) => {
                if (exam.id === examInfo.id)
                    return {
                        ...exam,
                        ...examInfo
                    }
                else
                    return { ...exam };
            })

            state.listExams = newListExams;
        },
        [deleteExamRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;
            const question_id = response_data;

            const newListExams = state.listExams.filter((exam) => exam.id !== question_id);

            state.listExams = newListExams;
        }
    }
})

export const { chooseExam, closeExamFormDialog, createExam, editExam } = examSlice.actions;

export default examSlice.reducer;