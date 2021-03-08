import fake_contestSession_list from './fake_contest_session';
import { fakeApi } from '../../app/fakeApi';
import queryString from 'query-string'
import axiosClient from './../../app/AxiosClient';


export const contestSessionApi = {
    getContestSessionData: async () => {
        // let response = await fakeApi({
        //     request: null,
        //     response: {
        //         status: 200,
        //         data: fake_contestSession_list
        //     },
        //     timeOut: 1000
        // })

        // return response;
        const params = {page:0,pageSize:500};
        const url = "/session"+'?'+queryString.stringify(params);

        let response = await axiosClient.get(url);
        return response;
    },

    pushNewContestSession: async (contestSessionInfo) => {
        // const response = await fakeApi({
        //     request: contestSessionInfo,
        //     response:
        //     {
        //         status: 200,
        //         data: { id: new Date().getTime() + Math.random() }
        //     }
        // })
        // return response;
        const url = "/session";
        let response = await axiosClient.post(url,contestSessionInfo);
        return response;
    },

    patchContestSessionInfo: async (contestSessionInfo,sessionId) => {
        // const response = await fakeApi({
        //     request: contestSessionInfo,
        //     response:
        //     {
        //         status: 200,
        //         data: { id: new Date().getTime() + Math.random() }
        //     }
        // })
        // return response;

        const url = `/session/${sessionId}`;
        let response = await axiosClient.patch(url,contestSessionInfo);
        return response;

    },

    deleteContestSession: async (sessionId) => {
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
        const url = `/session/${sessionId}`;
        let response = await axiosClient.delete(url);
        return response;
    },
    activeContestSession: async (contest_session_id) => {
        // const response = await fakeApi({
        //     request: contest_session_id,
        //     response:
        //     {
        //         status: 200,
        //         data: contest_session_id
        //     },
        //     timeOut: 200
        // })
        // return response;

        const url = `/session/${contest_session_id}/active`;
        let response = await axiosClient.get(url);
        return response;


    },
    deactiveContestSession: async (contest_session_id) => {
        // const response = await fakeApi({
        //     request: contest_session_id,
        //     response:
        //     {
        //         status: 200,
        //         data: contest_session_id
        //     },
        //     timeOut: 200
        // })
        // return response;

        const url = `/session/${contest_session_id}/final`;
        let response = await axiosClient.get(url);
        return response;
    },




}