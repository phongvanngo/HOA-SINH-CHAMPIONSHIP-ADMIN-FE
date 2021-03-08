import fake_university_list from './fake_university_data';
import { fakeApi } from '../../app/fakeApi';
import queryString from 'query-string'

import axiosClient from '../../app/AxiosClient';

export const universityApi = {
    getUniversityData: async () => {
        let response = await fakeApi({
            request: null,
            response: {
                status: 200,
                data: fake_university_list
            },
            timeOut: 1000
        })
        return response;

        // const params = {page:0,pageSize:500};
        // const url = "/university"+'?'+queryString.stringify(params);

        // let response = await axiosClient.get(url);
        // return response;

    },

    pushNewUniversity: async (universityInfo) => {
        const response = await fakeApi({
            request: universityInfo,
            response:
            {
                status: 200,
                data: { id: new Date().getTime() + Math.random() }
            }
        })
        return response;
        // const url = "/university";
        // console.log(universityInfo);
        // let response = await axiosClient.post(url,universityInfo);
        // return response;
    },

    patchUniversityInfo: async (universityInfo,university_id) => {
        const response = await fakeApi({
            request: universityInfo,
            response:
            {
                status: 200,
                data: { id: new Date().getTime() + Math.random() }
            }
        })
        return response;
        // const url = "/university/"+university_id;
        // console.log(universityInfo);
        // let response = await axiosClient.patch(url,universityInfo);
        // return response;
    },

    deleteUniversity: async (university_id) => {
        const response = await fakeApi({
            request: university_id,
            response:
            {
                status: 200,
                data: university_id
            },
            timeOut: 200
        })
        return response;

        // const url = "/university/"+university_id;
        // let response = await axiosClient.delete(url);
        // return response;
    },
}