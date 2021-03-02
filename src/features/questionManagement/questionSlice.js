import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from './../../common/component/Notifier/notifierSlice';
import { questionApi } from './questionApi';
import { startLoading, stopLoading } from './../../common/component/PageLoader/loadingSlice';

export const fetchQuestionRequest = createAsyncThunk(
    'question/fetchQuestionStatus',
    async (examId, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await questionApi.getQuestionData(examId);
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

export const createQuestionRequest = createAsyncThunk(
    'question/createQuestionStatus',
    async (questionInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await questionApi.pushNewQuestion(questionInfo);
            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Thêm đề thi thành công", options: { variant: 'success' } }));
                    dispatch(stopLoading());
                    return { data: response.data, questionInfo };
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const updateQuestionRequest = createAsyncThunk(
    'question/editQuestionStatus',
    async (questionInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await questionApi.patchQuestionInfo(questionInfo);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Sửa đề thi thành công", options: { variant: 'success' } }));
                    return { data: response.data, questionInfo };
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const deleteQuestionRequest = createAsyncThunk(
    'question/deleteQuestionStatus',
    async (question_id, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await questionApi.deleteQuestion(question_id);
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

export const questionSlice = createSlice({
    name: 'question',
    initialState: {
        listQuestions: [],
        chosenQuestionId: null,
        questionEditing: null,
        // {
        //     id: null,
        //     question_name: "abc",
        //     question: 12,
        //     total_score: 123,
        // }

    },

    reducers: {
        closeQuestionFormDialog: state => {
            state.questionEditing = null;
        },

        createQuestion: (state) => {
            state.questionEditing = null;
        },

        editQuestion: (state, action) => {
            const questionInfo = action.payload;
            state.questionEditing = questionInfo;
        },

        chooseQuestion: (state, action) => {
            const questionInfo = action.payload;
            state.questionEditing = questionInfo;
            state.chosenQuestionId = questionInfo.id;
        }
    },

    extraReducers: {
        [fetchQuestionRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;
            let questions = response_data;
            state.listQuestions = [...questions];

        },
        [createQuestionRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { data, questionInfo } = response_data;
            const { id } = data;
            const newListQuestions = [
                ...state.listQuestions,
                {
                    ...questionInfo,
                    available_question: 0,
                    id: id
                }
            ]
            state.listQuestions = newListQuestions;
        },
        [updateQuestionRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { questionInfo } = response_data;
            console.log(questionInfo);
            const newListQuestions = state.listQuestions.map((question) => {
                if (question.id === questionInfo.id)
                    return {
                        ...question,
                        ...questionInfo
                    }
                else
                    return { ...question };
            })

            state.listQuestions = newListQuestions;
        },
        [deleteQuestionRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;
            const question_id = response_data;

            const newListQuestions = state.listQuestions.filter((question) => question.id !== question_id);

            state.listQuestions = newListQuestions;
        }
    }
})

export const { chooseQuestion, closeQuestionFormDialog, createQuestion, editQuestion } = questionSlice.actions;

export default questionSlice.reducer;