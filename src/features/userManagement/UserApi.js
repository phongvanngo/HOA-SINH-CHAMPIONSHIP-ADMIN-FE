import { user_fake_data } from './user_fake_data';
import { fakeApi } from './../../app/fakeApi';
import queryString from 'query-string'
import axiosClient from './../../app/AxiosClient';


export const userApi = {
    getUserData: async (data) => {
        const { page, pageSize, sessionID } = data;
        // let response = await fakeApi({
        //     request: data,
        //     response: {
        //         status: 200,
        //         data: user_fake_data({ page: page, pageSize: pageSize, sessionID: sessionID })
        //     },
        //     timeOut: 1000
        // })

        // return response;

        const params = {page:page,pageSize:pageSize,sessionId:sessionID};
        const url = "/user"+'?'+ queryString.stringify(params);
        let response = await axiosClient.get(url);
        return response;

    },

    pushNewUser: async (userInfo) => {
        // const response = await fakeApi({
        //     request: userInfo,
        //     response:
        //     {
        //         status: 200,
        //         data: { id: new Date().getTime() + Math.random() }
        //     }
        // })
        // return response;
        const url = "/user";
        console.log(userInfo);
        let response = await axiosClient.post(url,userInfo);
        return response;
    },

    patchUserInfo: async (userInfo,userId) => {
        // const response = await fakeApi({
        //     request: userInfo,
        //     response:
        //     {
        //         status: 200,
        //         data: { id: new Date().getTime() + Math.random() }
        //     }
        // })
        // return response;
        const url = "/user/"+userId;
        let response = await axiosClient.patch(url,userInfo);
        return response;
    },

    deleteUser: async (user_id) => {
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

        const url = "/user/"+user_id;
        let response = await axiosClient.delete(url);
        return response;
    },
}