import React from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { logout } from './../../../features/login/loginSlice';

import DashboardView from "./View/DashboardView";

export default function Dashboard() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <div>
            <Router>
                <DashboardView handleLogout={handleLogout} />
            </Router>
        </div>
    )
}
