import { fakeApi } from './../../app/fakeApi';
import { list_question } from './fake_question_list';

export const questionApi = {
    getQuestionData: async (examId) => {
        let response = await fakeApi({
            request: examId,
            response: {
                status: 200,
                data: list_question(examId),
            },
            timeOut: 1000
        })

        return response;
    },

    pushNewQuestion: async (questionInfo) => {
        const response = await fakeApi({
            request: questionInfo,
            response:
            {
                status: 200,
                data: { id: new Date().getTime() + Math.random() }
            }
        })
        return response;
    },

    patchQuestionInfo: async (questionInfo) => {
        const response = await fakeApi({
            request: questionInfo,
            response:
            {
                status: 200,
                data: { id: new Date().getTime() + Math.random() }
            }
        })
        return response;
    },

    deleteQuestion: async (question_id) => {
        const response = await fakeApi({
            request: question_id,
            response:
            {
                status: 200,
                data: { id: new Date().getTime() + Math.random() }
            }
        })
        return response;
    }

}