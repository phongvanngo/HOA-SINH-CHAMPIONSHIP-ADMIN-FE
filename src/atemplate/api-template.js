import fake_exam_list from './fake_exam_data';
import { fakeApi } from './../../app/fakeApi';

export const examApi = {
    getExamData: async () => {
        let response = await fakeApi({
            request: null,
            response: {
                status: 200,
                data: fake_exam_list
            },
            timeOut: 1000
        })

        return response;

    },

    pushNewExam: async (examInfo) => {
        const response = await fakeApi({
            request: examInfo,
            response:
            {
                status: 200,
                data: { id: new Date().getTime() + Math.random() }
            }
        })
        return response;
    },

    patchExamInfo: async (examInfo) => {
        const response = await fakeApi({
            request: examInfo,
            response:
            {
                status: 200,
                data: { id: new Date().getTime() + Math.random() }
            }
        })
        return response;
    },

    deleteExam: async (question_id) => {
        const response = await fakeApi({
            request: question_id,
            response:
            {
                status: 200,
                data: question_id
            },
            timeOut: 200
        })
        return response;
    },




}