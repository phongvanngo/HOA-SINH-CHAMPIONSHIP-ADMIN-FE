import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ListContestSession from './View/ListSession';
import ContestSessionFormDialog from './View/SessionFormDialog';
import { fetchExamRequest } from './../examManagement/ExamSlice';

export default function ContestSessionManagement() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchExamRequest({}));
    }, [dispatch])
    return (
        <div>
            <ContestSessionFormDialog />
            <ListContestSession />
        </div>
    )
}
