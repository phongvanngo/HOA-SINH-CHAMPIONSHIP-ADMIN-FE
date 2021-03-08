import fake_exam_list from './fake_exam_data';
import { fakeApi } from './../../app/fakeApi';
import queryString from 'query-string'

import axiosClient from './../../app/AxiosClient';

export const examApi = {
    getExamData: async () => {
        // let response = await fakeApi({
        //     request: null,
        //     response: {
        //         status: 200,
        //         data: fake_exam_list
        //     },
        //     timeOut: 1000
        // })
        const params = {page:0,pageSize:500};
        const url = "/exam"+'?'+queryString.stringify(params);

        let response = await axiosClient.get(url);
        return response;

    },

    pushNewExam: async (examInfo) => {
        // const response = await fakeApi({
        //     request: examInfo,
        //     response:
        //     {
        //         status: 200,
        //         data: { id: new Date().getTime() + Math.random() }
        //     }
        // })
        const url = "/exam";
        console.log(examInfo);
        let response = await axiosClient.post(url,examInfo);
        return response;
    },

    patchExamInfo: async (examInfo,exam_id) => {
        // const response = await fakeApi({
        //     request: examInfo,
        //     response:
        //     {
        //         status: 200,
        //         data: { id: new Date().getTime() + Math.random() }
        //     }
        // })
        // return response;
        const url = "/exam/"+exam_id;
        console.log(examInfo);
        let response = await axiosClient.patch(url,examInfo);
        return response;
    },

    deleteExam: async (exam_id) => {
        // const response = await fakeApi({
        //     request: question_id,
        //     response:
        //     {
        //         status: 200,
        //         data: question_id
        //     },
        //     timeOut: 200
        // })
        // return response;

        const url = "/exam/"+exam_id;
        let response = await axiosClient.delete(url);
        return response;
    },
}