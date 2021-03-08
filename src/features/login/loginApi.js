import { fakeApi } from './../../app/fakeApi';
import axiosClient from './../../app/AxiosClient';

const loginApi = {
    sendLoginInfo: async (loginInfo) => {

        const url = '/auth/login/admin';
        return axiosClient.post(url,loginInfo);

        // let response = await fakeApi({
        //     request: loginInfo,
        //     response: {
        //         status: 200,
        //         data: {
        //             token: "my app token"
        //         }
        //     }
        //     , timeOut: 2000
        // }
        // )
        // return response;
    }
}

export default loginApi;