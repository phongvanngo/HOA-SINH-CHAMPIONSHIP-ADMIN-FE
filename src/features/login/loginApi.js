
const loginApi = {
    sendLoginInfo: async (loginInfo) => {
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ status: 200, data: { token: "my token" } });
            }, 2000)
        });
        return response;
    }
}

export default loginApi;