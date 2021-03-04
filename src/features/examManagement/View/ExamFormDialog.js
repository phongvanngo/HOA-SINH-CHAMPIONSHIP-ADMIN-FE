import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeExamFormDialog, createExamRequest, updateExamRequest } from './../ExamSlice';

export default function ExamFormDialog() {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.exam.isExamDialogOpen);
    let exam = useSelector(state => state.exam.examEditing);
    const [isEditExam, setIsEditExam] = useState(false);

    const examNameInputRef = useRef(null);
    const examQuestionInputRef = useRef(null);
    const examScoreInpuRef = useRef(null);

    const initialValidInput = {
        exam_name: true,
        question: true,
        total_score: true,
    }

    const [isValidInput, setIsValidInput] = useState(initialValidInput);

    const [examEditing, setExamEditing] = useState({
        exam_name: null,
        question: null,
        total_score: null,
    });

    useEffect(() => {
        // khi sửa câu hỏi đã có, thao tác để lấy giá trị ref, cập nhật lại input ban đầu  
        if (exam !== null) {
            setExamEditing({
                ...exam,
                id: exam.id
            });
            setIsEditExam(true);
        }
        else {
            setIsEditExam(false);
        }
    }, [exam]);

    useEffect(() => {
        //cập nhật giá trị ban đầu
        if (examQuestionInputRef.current !== null) examQuestionInputRef.current.value = examEditing.question;
        if (examScoreInpuRef.current !== null) examScoreInpuRef.current.value = examEditing.total_score;
        if (examNameInputRef.current !== null) examNameInputRef.current.value = examEditing.exam_name;
    }, [examEditing])

    const handleSubmit = () => {
        const exam_name = examNameInputRef.current.value;
        const question = examQuestionInputRef.current.value;
        const total_score = examScoreInpuRef.current.value;
        let examInfo = { question: question, total_score: total_score, exam_name: exam_name };

        //validate
        let isValid = initialValidInput;

        let checkValid = true;
        if (exam_name === "") {
            isValid.exam_name = false;
            checkValid = false;
        }
        if (isNaN(Number(question)) || question === "") {
            isValid.question = false;
            checkValid = false;
        };
        if (isNaN(Number(total_score)) || total_score === "") {
            isValid.total_score = false;
            checkValid = false;
        };

        if (checkValid === true) {

            let newExamInfo = {
                exam_name: exam_name,
                question: Number(question),
                total_score: Number(total_score)
            };

            if (isEditExam === false) {
                //tạo câu hỏi mới
                dispatch(createExamRequest(newExamInfo));
            }
            else {
                //cập nhật câu hỏi cũ
                newExamInfo = { ...newExamInfo, id: examEditing.id };
                dispatch(updateExamRequest(newExamInfo));
            }

            dispatch(closeExamFormDialog());

            //đặt validate lại như cũ
            setIsValidInput(initialValidInput);
        }

        else {

            setExamEditing({
                ...examEditing,
                ...examInfo
            })

            setIsValidInput(isValid);
        }
    }

    const handleClose = () => {
        setIsValidInput(initialValidInput);
        dispatch(closeExamFormDialog());
    };

    if (isOpen === false) return null;

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {isEditExam ? 'Chỉnh sửa đề thi' : 'Tạo mới đề thi'}
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
          </DialogContentText> */}
                    <TextField
                        inputRef={examNameInputRef}
                        autoFocus
                        margin="dense"
                        label="Tên đề thi"
                        type="email"
                        fullWidth
                        error={!isValidInput.exam_name}
                        helperText={isValidInput.exam_name ? "" : "Dữ liệu còn trống"}
                    />
                    <TextField
                        inputRef={examQuestionInputRef}
                        margin="dense"
                        label="Số câu hỏi"
                        type="email"
                        fullWidth
                        required={true}
                        error={!isValidInput.question}
                        helperText={isValidInput.question ? "" : "Dữ liệu phải là số và không được để trống"}
                    />
                    <TextField
                        inputRef={examScoreInpuRef}
                        margin="dense"
                        label="Tổng điểm"
                        type="email"
                        fullWidth
                        required={true}
                        error={!isValidInput.total_score}
                        helperText={isValidInput.total_score ? "" : "Dữ liệu phải là số và không được để trống"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hủy
          </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Lưu
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
