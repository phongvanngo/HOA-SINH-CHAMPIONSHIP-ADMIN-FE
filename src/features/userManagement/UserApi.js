import { user_fake_data } from './user_fake_data';
import { fakeApi } from './../../app/fakeApi';

export const userApi = {
    getUserData: async (data) => {
        const { page, pageSize, sessionID } = data;
        let response = await fakeApi({
            request: data,
            response: {
                status: 200,
                data: user_fake_data({ page: page, pageSize: pageSize, sessionID: sessionID })
            },
            timeOut: 1000
        })

        return response;

    },

    pushNewUser: async (userInfo) => {
        const response = await fakeApi({
            request: userInfo,
            response:
            {
                status: 200,
                data: { id: new Date().getTime() + Math.random() }
            }
        })
        return response;
    },

    patchUserInfo: async (userInfo) => {
        const response = await fakeApi({
            request: userInfo,
            response:
            {
                status: 200,
                data: { id: new Date().getTime() + Math.random() }
            }
        })
        return response;
    },

    deleteUser: async (question_id) => {
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