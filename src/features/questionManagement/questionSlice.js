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
    answerE: "",
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
                case 401:
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
        const { dispatch } = thunkApi;

        try {
            dispatch(startLoading());

            //transfer schema
            const {exam_id,content,image,answerA,answerB,answerC,answerD,answerE,correctAnswer} = questionInfo;
            const newQuestion = {
                examId: exam_id,
                content:content,
                image:image,
                answerA:answerA,
                answerB:answerB,
                answerC:answerC,
                answerD:answerD,
                answerE:answerE,
                result:correctAnswer
            }

            const response = await questionApi.pushNewQuestion(newQuestion);
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

            //transfer schema
            const {id,exam_id,content,image,answerA,answerB,answerC,answerD,answerE,correctAnswer} = questionInfo;
            const newQuestion = {
                examId: exam_id,
                content:content,
                image:image,
                answerA:answerA,
                answerB:answerB,
                answerC:answerC,
                answerD:answerD,
                answerE:answerE,
                result:correctAnswer
            }

            const response = await questionApi.patchQuestionInfo(newQuestion,id);
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

        //trường hợp mới tạo câu hỏi xong và xóa, 
        if (question_id === null) {
            return { question_id };
        }

        try {
            dispatch(startLoading());
            const response = await questionApi.deleteQuestion(question_id);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Xóa đề thi thành công", options: { variant: 'success' } }));
                    return { question_id };
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

        editingQuestion: null,

        hasEditRequest: false,
        requestQuestion: null,
        isSavedNewQuestion: true,



        //chọn xem câu khác --> lưu yêu cầu biến --> save dữ liệu hiện tại --> chuyển đến câu đó
        //tạo câu hỏi mới --> soạn, chưa lưu --> tạo câu hỏi mới
        //createQuestion ____nếu chưa lưu (isSavedNewQuestion == false)___ save câu hỏi
    },              //  |____nếu lưu rồi  ___ tạo mảng mới      

    reducers: {
        closeQuestionFormDialog: state => {
            state.editingQuestion = null;
        },

        createQuestion: (state) => {
            state.isEditingQuestion = true;
            if (state.isSavedNewQuestion === false) {
                //đang soạn 1 câu hỏi mới mà chọn câu hỏi mới
                state.isSavedNewQuestion = true;
                state.hasEditRequest = true;
                state.editingQuestion = initialQuestion;
            }
            else {
                state.isSavedNewQuestion = false;
                state.listQuestions = [
                    ...state.listQuestions,
                    {
                        ...initialQuestion
                    }
                ]
                state.requestQuestion = initialQuestion;

                if (state.editingQuestion === null) {
                    state.hasEditRequest = false;
                    state.editingQuestion = initialQuestion;
                    state.chosenQuestionId = null;
                } else {
                    state.hasEditRequest = true;
                }

            }

        },

        editQuestion: (state, action) => {
            const questionInfo = action.payload;

            //nếu chọn lại chính câu hỏi đó;
            if (questionInfo.id === state.chosenQuestionId) return;

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


    },

    extraReducers: {
        [fetchQuestionRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;
            let questions = response_data.rows.map(element =>{
                const {id,examId,content,answerA,answerB,answerC,answerD,answerE,result,image} = element;
                return {
                    id:id,
                    exam_id:examId,
                    content:content,
                    answerA:answerA,
                    answerB:answerB,
                    answerC:answerC,
                    answerD:answerD,
                    answerE:answerE,
                    correctAnswer:result,
                }
            });
            console.log(response_data);
            state.editingQuestion = null;
            state.chosenQuestionId = null;
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

            if (state.isSavedNewQuestion === false) {

                //tiếp tục câu hỏi mới
                state.isSavedNewQuestion = true;

                state.editingQuestion = newQuestion;

                if (state.chosenQuestionId === null)
                    state.chosenQuestionId = id;

                if (state.hasEditRequest === true) {
                    state.chosenQuestionId = state.requestQuestion.id;
                    state.editingQuestion = state.requestQuestion;
                    state.hasEditRequest = false;
                }

            } else {
                //đang soạn câu hỏi mới và chọn câu hỏi mới
                newListQuestions.push(initialQuestion);

                state.chosenQuestionId = null;
                state.editingQuestion = initialQuestion;
                state.hasEditRequest = false;
                state.isSavedNewQuestion = false;

            }

            state.listQuestions = newListQuestions;


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
            const { question_id } = data;
            if (question_id === null) {
                //trường hợp vừa tạo câu hỏi xong và xóa
                state.isSavedNewQuestion = true;
            }
            const newListQuestions = state.listQuestions.filter((question) => question.id !== question_id);

            state.listQuestions = newListQuestions;
            state.editingQuestion = null;
        }
    }
})

export const { gotoQuestion, chooseQuestion, closeQuestionFormDialog, createQuestion, editQuestion } = questionSlice.actions;

export default questionSlice.reducer;