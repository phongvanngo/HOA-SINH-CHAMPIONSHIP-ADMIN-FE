import { fakeApi } from './../../app/fakeApi';
import { list_question } from './fake_question_list';
import queryString from 'query-string'
import axiosClient from './../../app/AxiosClient';

export const questionApi = {
    getQuestionData: async (examId) => {
        // let response = await fakeApi({
        //     request: examId,
        //     response: {
        //         status: 200,
        //         data: list_question(examId),
        //     },
        //     timeOut: 1000
        // })

        const params = {page:0,pageSize:100};
        const url = `/exam/${examId}/questions?${queryString.stringify(params)}`;
        let response = await axiosClient.get(url,);
        return response;
    },

    pushNewQuestion: async (questionInfo) => {
        // const response = await fakeApi({
        //     request: questionInfo,
        //     response:
        //     {
        //         status: 200,
        //         data: { id: new Date().getTime() + Math.random() }
        //     }
        // })
        const url = `/question`;
        let response = await axiosClient.post(url,questionInfo);
        return response;
    },

    patchQuestionInfo: async (questionInfo,questionId) => {
        // const response = await fakeApi({
        //     request: questionInfo,
        //     response:
        //     {
        //         status: 200,
        //         data: { id: new Date().getTime() + Math.random() }
        //     }
        // })
        // return response;

        const url = `/question/${questionId}`;
        let response = await axiosClient.patch(url,questionInfo);
        return response;
    },

    deleteQuestion: async (question_id) => {
        // const response = await fakeApi({
        //     request: question_id,
        //     response:
        //     {
        //         status: 200,
        //         data: { id: new Date().getTime() + Math.random() }
        //     }
        // })
        // return response;
        const url = `/question/${question_id}`;
        let response = await axiosClient.delete(url);
        return response;
    }

}