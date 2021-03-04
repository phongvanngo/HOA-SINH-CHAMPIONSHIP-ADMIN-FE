import fake_contestSession_list from './fake_contest_session';
import { fakeApi } from '../../app/fakeApi';

export const contestSessionApi = {
    getContestSessionData: async () => {
        let response = await fakeApi({
            request: null,
            response: {
                status: 200,
                data: fake_contestSession_list
            },
            timeOut: 1000
        })

        return response;

    },

    pushNewContestSession: async (contestSessionInfo) => {
        const response = await fakeApi({
            request: contestSessionInfo,
            response:
            {
                status: 200,
                data: { id: new Date().getTime() + Math.random() }
            }
        })
        return response;
    },

    patchContestSessionInfo: async (contestSessionInfo) => {
        const response = await fakeApi({
            request: contestSessionInfo,
            response:
            {
                status: 200,
                data: { id: new Date().getTime() + Math.random() }
            }
        })
        return response;
    },

    deleteContestSession: async (question_id) => {
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
    activeContestSession: async (contest_session_id) => {
        const response = await fakeApi({
            request: contest_session_id,
            response:
            {
                status: 200,
                data: contest_session_id
            },
            timeOut: 200
        })
        return response;
    },
    deactiveContestSession: async (contest_session_id) => {
        const response = await fakeApi({
            request: contest_session_id,
            response:
            {
                status: 200,
                data: contest_session_id
            },
            timeOut: 200
        })
        return response;
    },




}