import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DashboardRoutes } from '../../../routes.const';
import { fetchQuestionRequest, createQuestion } from '../questionSlice';
import ListQuestions from './ListQuestions';
import './MainContainer.css';
import QuestionForm from './QuestionForm';

export default function QuestionManagement() {
    const dispatch = useDispatch();
    const history = useHistory();
    let { exam_id } = useParams();
    const detailedChosenExam = useSelector(state => state.exam.detailedChosenExam)

    if (detailedChosenExam === null) {
        //trường hợp reload trang thì không lấy được chi tiết đề thi từ redux, phải redirect về
        history.replace(DashboardRoutes.EXAM_MANAGEMENT);
    }
    console.log("question manager render");
    console.log(detailedChosenExam);
    useEffect(() => {
        dispatch(fetchQuestionRequest(exam_id));
    }, [dispatch])

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
                            onClick={() => {
                                dispatch((createQuestion()))
                            }}
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
