import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from './../features/login/loginSlice';
import loadingReducer from '../common/component/PageLoader/loadingSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    loading: loadingReducer
  },
});
