import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchQuestionRequest } from '../questionSlice';
import ListQuestions from './ListQuestions';
import QuestionForm from './QuestionForm';
import './MainContainer.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Typography } from '@material-ui/core';
import { DashboardRoutes } from '../../../routes.const';


export default function QuestionManagement() {
    const dispatch = useDispatch();
    const history = useHistory();
    let { exam_id } = useParams();
    const detailedChosenExam = useSelector(state => state.exam.detailedChosenExam)

    if (detailedChosenExam === null) {
        //trường hợp reload trang thì không lấy được chi tiết đề thi từ redux, phải redirect về
        history.replace(DashboardRoutes.EXAM_MANAGEMENT);
    }

    console.log(detailedChosenExam);
    useEffect(() => {
        dispatch(fetchQuestionRequest(exam_id));
    }, [])

    return (
        <React.Fragment>
            <div className="question-management-title">
                <Typography variant="h6" style={{ textAlign: "left" }}>
                    Danh sách câu hỏi
</Typography>
                <div className="detailed-exam">
                    <span>{`Tên đề thi: ${detailedChosenExam ? detailedChosenExam.exam_name : ""}`}</span>
                    <span>{`Số câu hỏi: ${detailedChosenExam ? detailedChosenExam.question : ""}`}</span>
                    <span>{`Tổng điểm ${detailedChosenExam ? detailedChosenExam.total_score : ""}`}</span>
                </div>

            </div>
            <div className="question-management-main-area">
                <div className="list-question-area">
                    <div className="list-question">
                        <ListQuestions />
                    </div>
                    <div className="control">
                        <Button
                            variant="contained"
                            color="default"
                            startIcon={<AddCircleOutlineIcon />}
                        >
                            Câu hỏi mới
      </Button>
                    </div>
                </div>
                <div className="question-form">
                    <QuestionForm />
                </div>

            </div>
        </React.Fragment>
    )
}
