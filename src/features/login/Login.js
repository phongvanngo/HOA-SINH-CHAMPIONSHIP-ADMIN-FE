import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom'

import { loginRequest, loginAgain } from './loginSlice';

export default function Login() {

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const dispatch = useDispatch();
    let location = useLocation();
    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

    //kiểm tra đã đăng nhập gần đây chưa, nếu rồi thì ko cần đăng nhập lại
    const idToken = localStorage.getItem('id_token');
    if (idToken != null) dispatch(loginAgain());

    React.useEffect(() => {
        console.log("login render");
        if (isLoggedIn) {
            setRedirectToReferrer(true);
        }

    }, [isLoggedIn]);

    const handleLogin = () => {
        const loginInfo = { username: "", password: "" };
        dispatch(loginRequest(loginInfo));
    }

    let { from } = location.state || {
        from: { pathname: '/' },
    };

    if (redirectToReferrer) {
        return <Redirect to={from} />;
    }

    return (
        <div>
            SignIn
            <button
                onClick={handleLogin}
            >Sign In</button>
        </div>
    )
}
