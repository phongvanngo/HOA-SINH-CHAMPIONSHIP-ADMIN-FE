import axios from 'axios';
// import { get, save } from './localStorage';
import queryString from 'query-string';
import { get, save } from './localStorage';

const instance = axios.create({
  //baseURL: 'http://ttcong2301.southeastasia.cloudapp.azure.com:3000',
  // baseURL: 'http://localhost:3000/api/v1',
  // baseURL: 'https://uitrun-test.herokuapp.com/api/v1',
  baseURL: 'http://localhost:3000/api/v1',
  // baseURL: 'https://y-tuong-khoi-nghiep.herokuapp.com/api/v1',
  // baseURL: 'https://ytuongkhoinghiep.uit.edu.vn/api/v1',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

// ADD Token into Headers
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('id_token');
    //console.log(token);
    //console.log('hello from interceptors');
    if (token) {
      // config.headers["Authorization"] = `${token}`;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => err
);

const getNewTokenAndReattemptRequest = async (config, refToken) => {
  try {
    //console.log(refToken);
    const getNewToken = await axios.post('127.0.0.1/users/token', {
      refreshtoken: refToken,
    });
    //console.log(getNewToken);
    const { token, refreshtoken } = getNewToken.data;
    save('accessToken', token);
    save('refreshToken', refreshtoken);
    // config.headers["Authorization"] = `${token}`;
    config.headers.Authorization = `${token}`;
    return await axios(config);
  } catch (err) {
    window.location.reload();
    return Promise.reject(err);
  }
};

instance.interceptors.response.use(
  res => res,
  error => {
    const {
      config,
      config: { validateStatus },
      response: { status },
    } = error;
    return error.response;
    // console.log(error.config,error.response);
    // if (validateStatus()) return error;
    // if (status === 401) {
    //   //console.log('hello from refresh');
    //   // const refreshToken = get('refreshToken');
    //   // if (refreshToken)
    //   //   return getNewTokenAndReattemptRequest(config, refreshToken);
    //   // else {
    //   //   window.location.reload();
    //   //   return;
    //   // }
    //   // console.log('401');
    //   return 401;
    // }
    // if (status === 404) {
    //   return error;
    // }
    // return error;
  }
);
export default instance;
