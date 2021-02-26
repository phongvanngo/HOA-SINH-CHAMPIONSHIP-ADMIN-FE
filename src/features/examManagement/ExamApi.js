import fake_exam_list from './fake_exam_data';
import { fakeApi } from './../../app/fakeApi';

export const examApi = {
    getExamData: async () => {
        let response = await fakeApi({
            request: null,
            response: {
                status: 200,
                data: fake_exam_list
            }
        })

        return response;

    },

    pushExam: async (examInfo) => {
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: [
                        {
                            title: "kaka"
                        }
                    ]
                });
            }, 2000)
        })
        return response;
    }
}