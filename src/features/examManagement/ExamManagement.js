import React from 'react';
import ListExam from './View/ListExam';
import ExamFormDialog from './View/ExamFormDialog';

export default function ExamManagement() {
    return (
        <div>
            <ExamFormDialog />
            <ListExam />
        </div>
    )
}
