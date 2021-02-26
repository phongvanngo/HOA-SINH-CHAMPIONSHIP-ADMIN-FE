import fake_exam_list from './fake_exam_data';
import { fakeApi } from './../../app/fakeApi';

export const examApi = {
    getExamData: async () => {
        console.log("get exam data");
        let response = await fakeApi({
            request: null,
            response: {
                status: 404,
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