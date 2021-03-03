import React, { useRef, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeContestSessionFormDialog } from '../ContestSessionSlice';
import { createContestSessionRequest, updateContestSessionRequest } from '../ContestSessionSlice';

export default function ContestSessionFormDialog() {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.contestSession.isContestSessionDialogOpen);
    let contestSession = useSelector(state => state.contestSession.contestSessionEditing);
    const [isEditContestSession, setIsEditContestSession] = useState(false);

    const contestSessionNameInputRef = useRef(null);
    const contestSessionQuestionInputRef = useRef(null);
    const contestSessionScoreInpuRef = useRef(null);

    const initialValidInput = {
        contestSession_name: true,
        question: true,
        total_score: true,
    }

    const [isValidInput, setIsValidInput] = useState(initialValidInput);

    const [contestSessionEditing, setContestSessionEditing] = useState({
        contestSession_name: null,
        question: null,
        total_score: null,
    });

    useEffect(() => {
        // khi sửa câu hỏi đã có, thao tác để lấy giá trị ref, cập nhật lại input ban đầu  
        if (contestSession !== null) {
            setContestSessionEditing({
                ...contestSession,
                id: contestSession.id
            });
            setIsEditContestSession(true);
        }
        else {
            setIsEditContestSession(false);
        }
    }, [contestSession]);

    useEffect(() => {
        //cập nhật giá trị ban đầu
        if (contestSessionQuestionInputRef.current !== null) contestSessionQuestionInputRef.current.value = contestSessionEditing.question;
        if (contestSessionScoreInpuRef.current !== null) contestSessionScoreInpuRef.current.value = contestSessionEditing.total_score;
        if (contestSessionNameInputRef.current !== null) contestSessionNameInputRef.current.value = contestSessionEditing.contestSession_name;
    }, [contestSessionEditing])

    const handleSubmit = () => {
        const contestSession_name = contestSessionNameInputRef.current.value;
        const question = contestSessionQuestionInputRef.current.value;
        const total_score = contestSessionScoreInpuRef.current.value;
        let contestSessionInfo = { question: question, total_score: total_score, contestSession_name: contestSession_name };

        //validate
        let isValid = initialValidInput;

        let checkValid = true;
        if (contestSession_name === "") {
            isValid.contestSession_name = false;
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

            let newContestSessionInfo = {
                contestSession_name: contestSession_name,
                question: Number(question),
                total_score: Number(total_score)
            };

            if (isEditContestSession === false) {
                //tạo câu hỏi mới
                dispatch(createContestSessionRequest(newContestSessionInfo));
            }
            else {
                //cập nhật câu hỏi cũ
                newContestSessionInfo = { ...newContestSessionInfo, id: contestSessionEditing.id };
                dispatch(updateContestSessionRequest(newContestSessionInfo));
            }

            dispatch(closeContestSessionFormDialog());

            //đặt validate lại như cũ
            setIsValidInput(initialValidInput);
        }

        else {

            setContestSessionEditing({
                ...contestSessionEditing,
                ...contestSessionInfo
            })

            setIsValidInput(isValid);
        }
    }

    const handleClose = () => {
        setIsValidInput(initialValidInput);
        dispatch(closeContestSessionFormDialog());
    };

    if (isOpen === false) return null;

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {isEditContestSession ? 'Chỉnh sửa đề thi' : 'Tạo mới đề thi'}
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
          </DialogContentText> */}
                    <TextField
                        inputRef={contestSessionNameInputRef}
                        autoFocus
                        margin="dense"
                        label="Tên đề thi"
                        type="email"
                        fullWidth
                        error={!isValidInput.contestSession_name}
                        helperText={isValidInput.contestSession_name ? "" : "Dữ liệu còn trống"}
                    />
                    <TextField
                        inputRef={contestSessionQuestionInputRef}
                        margin="dense"
                        label="Số câu hỏi"
                        type="email"
                        fullWidth
                        required={true}
                        error={!isValidInput.question}
                        helperText={isValidInput.question ? "" : "Dữ liệu phải là số và không được để trống"}
                    />
                    <TextField
                        inputRef={contestSessionScoreInpuRef}
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
