import React from 'react'
import { useDispatch } from 'react-redux';
import ListExam from './View/ListExam';
import { startLoading, stopLoading } from './../../common/component/PageLoader/loadingSlice';
import { fetchExamRequest } from './ExamSlice';

export default function ExamManagement() {
    return (
        <div>
            <ListExam />
        </div>
    )
}
