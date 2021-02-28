import React from 'react';
import { useSelector } from 'react-redux';
import loaderImg from "./loader.gif";
import './PageLoader.css';



export default function PageLoader() {
    const isLoading = useSelector(state => state.loading.isLoading)

    if (isLoading === false) return null;

    return (
        <div className="loader-container">
            <div className="loader">
                <img alt="loading" src={loaderImg}></img>
            </div>
        </div>
    )
}
