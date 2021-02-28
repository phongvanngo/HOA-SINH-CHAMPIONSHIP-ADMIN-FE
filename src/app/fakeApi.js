export const fakeApi = ({ request, response, timeOut }) => {
    console.log("send ", request);
    const { status, data } = response;
    return new Promise((resolve, reject) => {
        if (status === 1000) throw new Error('lỗi code');
        setTimeout(() => {
            switch (status) {
                case 200:
                    resolve({ status: 200, data: data });
                    break;
                case 404:
                    resolve({ status: 404 });
                    break;
                case 500:
                    reject('server error');
                    break;
                default:
                    reject('error error error');
            }
        }, timeOut);
    })
}