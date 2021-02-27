import { fakeApi } from './../../app/fakeApi';

const loginApi = {
    sendLoginInfo: async (loginInfo) => {
        let response = await fakeApi({
            request: loginInfo,
            response: {
                status: 200,
                data: {
                    token: "my app token"
                }
            }
        }
        )
        return response;
    }
}

export default loginApi;