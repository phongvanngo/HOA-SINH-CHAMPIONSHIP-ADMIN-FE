import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { loginAgain, loginRequest } from './loginSlice';
import LoginView from './View/LoginView';
import { startLoading, stopLoading } from './../../common/component/PageLoader/loadingSlice';

export default function Login() {

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    let location = useLocation();
    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

    //kiểm tra đã đăng nhập gần đây chưa, nếu rồi thì ko cần đăng nhập lại
    const idToken = localStorage.getItem('id_token');

    if (idToken != null) dispatch(loginAgain());

    React.useEffect(() => {
        if (isLoggedIn) {
            setRedirectToReferrer(true);
        }

    }, [isLoggedIn]);


    const handleLogin = (loginInfo) => {
        dispatch(startLoading());
        dispatch(loginRequest({ loginInfo, enqueueSnackbar })).then(() => {
            dispatch(stopLoading());
        });
    }

    let { from } = location.state || {
        from: { pathname: '/' },
    };

    if (redirectToReferrer) {
        return <Redirect to={from} />;
    }

    return (
        <div>
            <LoginView handleLogin={handleLogin} />
        </div>
    )
}
