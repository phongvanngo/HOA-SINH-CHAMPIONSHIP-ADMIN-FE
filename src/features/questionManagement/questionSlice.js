import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from './../../common/component/Notifier/notifierSlice';
import { questionApi } from './questionApi';
import { startLoading, stopLoading } from './../../common/component/PageLoader/loadingSlice';

const shouldSaveData = (prevQuestion, currQuestion) => {
    if (prevQuestion === null || currQuestion === null) return true;
    if (prevQuestion.content !== currQuestion.content) return true;
    if (prevQuestion.image !== currQuestion.image) return true;
    if (prevQuestion.answerA !== currQuestion.answerA) return true;
    if (prevQuestion.answerB !== currQuestion.answerB) return true;
    if (prevQuestion.answerC !== currQuestion.answerC) return true;
    if (prevQuestion.answerD !== currQuestion.answerD) return true;
    if (prevQuestion.correctAnswer !== currQuestion.correctAnswer) return true;
    return false;
}

const initialQuestion = {
    id: null,
    exam_id: null,
    content: "",
    image: "",
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    correctAnswer: "A",
}

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
        console.log(questionInfo);
        const { dispatch, getState } = thunkApi;

        try {
            dispatch(startLoading());
            const response = await questionApi.pushNewQuestion(questionInfo);
            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Thêm đề thi thành công", options: { variant: 'success' } }));
                    dispatch(stopLoading());
                    return { response_data: response.data, questionInfo };
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
        const { dispatch, getState } = thunkApi;

        //kiểm tra 
        const editingQuestion = getState().question.editingQuestion;
        if (shouldSaveData(editingQuestion, questionInfo) === false) return null;

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
        isEditingQuestion: false,
        editingQuestion: null,

        hasEditRequest: false,
        requestQuestion: null,

        // {
        //     id: null,
        //     question_name: "abc",
        //     question: 12,
        //     total_score: 123,
        // },
        currentCorrectAnswer: 'A',

        //dùng để back up giá trị chọn trước đó
        prev_chosenCorrectAnswer: 'A',
        prev_editedQuestion: null,

        //chọn xem câu khác --> lưu yêu cầu biến --> save dữ liệu hiện tại --> chuyển đến câu đó

    },

    reducers: {
        closeQuestionFormDialog: state => {
            state.editingQuestion = null;
        },

        createQuestion: (state) => {
            state.isEditingQuestion = true;
            state.editingQuestion = { ...initialQuestion };
            state.listQuestions = [
                ...state.listQuestions,
                {
                    ...initialQuestion
                }
            ]
            state.chosenQuestionId = null;
            state.hasEditRequest = true;
            state.requestQuestion = initialQuestion;

        },

        editQuestion: (state, action) => {
            const questionInfo = action.payload;
            state.requestQuestion = questionInfo;
            if (state.editingQuestion === null) {
                state.hasEditRequest = false;
                state.editingQuestion = questionInfo;
                state.chosenQuestionId = questionInfo.id;
            } else {
                state.hasEditRequest = true;
            }
        },

        gotoQuestion: (state, action) => {
            state.editQuestion = state.requestQuestion;
        },

        chooseQuestion: (state, action) => {

            const questionInfo = action.payload;

            state.hasEditRequest = true;
            state.requestQuestion = questionInfo;

        },

        changeCurrentCorrectAnswer: (state, action) => {
            const currentCorrectAnswer = action.payload;
            // state.currentCorrectAnswer = currentCorrectAnswer;
            state.prev_chosenCorrectAnswer = currentCorrectAnswer;

        }
    },

    extraReducers: {
        [fetchQuestionRequest.fulfilled]: (state, action) => {
            const data = action.payload;
            if (data === null) return;
            let questions = data;
            state.listQuestions = [...questions];

        },
        [createQuestionRequest.fulfilled]: (state, action) => {
            const data = action.payload;
            if (data === null) return;

            const { response_data, questionInfo } = data;
            const { id } = response_data;
            console.log(id);
            let newQuestion = {
                ...questionInfo,
                available_question: 0,
                id: id,
            };
            const newListQuestions = state.listQuestions.filter((question) => question.id !== null);
            newListQuestions.push(newQuestion);

            state.editingQuestion = newQuestion;
            state.listQuestions = newListQuestions;
            if (state.chosenQuestionId === null)
                state.chosenQuestionId = id;

            if (state.hasEditRequest === true) {
                state.chosenQuestionId = state.requestQuestion.id;
                state.editingQuestion = state.requestQuestion;
                state.hasEditRequest = false;
            }

        },
        [updateQuestionRequest.fulfilled]: (state, action) => {
            const data = action.payload;

            if (state.hasEditRequest === true) {
                state.chosenQuestionId = state.requestQuestion.id;
                state.editingQuestion = state.requestQuestion;
                state.hasEditRequest = false;
            }

            if (data === null) return;

            const { questionInfo } = data;
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
            const data = action.payload;
            if (data === null) return;
            const question_id = data;

            const newListQuestions = state.listQuestions.filter((question) => question.id !== question_id);

            state.listQuestions = newListQuestions;
        }
    }
})

export const { gotoQuestion, changeCurrentCorrectAnswer, chooseQuestion, closeQuestionFormDialog, createQuestion, editQuestion } = questionSlice.actions;

export default questionSlice.reducer;