import React from 'react';
import ListExam from './View/ListSession';
import ExamFormDialog from './View/SessionFormDialog';

export default function ContestSessionManagement() {
    return (
        <div>
            <ExamFormDialog />
            <ListExam />
        </div>
    )
}
