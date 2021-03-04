import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContestSessionRequest, closeContestSessionFormDialog, updateContestSessionRequest } from '../ContestSessionSlice';
export default function ContestSessionFormDialog() {

    const isOpen = useSelector(state => state.contestSession.isContestSessionDialogOpen);
    let contestSession = useSelector(state => state.contestSession.contestSessionEditing);
    let listExams = useSelector(state => state.exam.listExams)
    const dispatch = useDispatch();

    const { id, name, exam_id } = contestSession || {};

    const contestSessionNameInputRef = useRef(null);


    const inititalValidInput = {
        contestSessionName: true,
        contestSessionExam: true,
    }
    const [validInput, setValidInput] = useState(inititalValidInput);

    const [chosenExam, setChosenExam] = useState(listExams[0]);
    const [flag, setFlag] = useState(0);


    useEffect(() => {
        if (isOpen === true) {
            // setChosenExam(null);
            //nếu sửa ca thi, setFlag để render lại và lấy ref của input
            if (contestSession !== null) {
                setFlag(flag + 1);
            }
        } else {
            setValidInput(inititalValidInput);
        }
    }, [isOpen])

    useEffect(() => {
        //nếu sửa ca thi
        try {
            contestSessionNameInputRef.current.value = name;
        } catch (error) {

        }

    }, [flag])

    const CheckValidInput = (dataSubmit) => {
        let valid = true;
        let validInputDetail = inititalValidInput;
        const { exam_id, name } = dataSubmit;


        if (name.trim() === "") {
            valid = false;
            validInputDetail.contestSessionName = false;
        }

        if (exam_id === null) {
            valid = false;
            validInputDetail.contestSessionExam = false;
        }

        if (valid === false) {
            setValidInput(validInputDetail);
            return false;
        }
        else
            return true;
    }

    const handleClose = () => {
        dispatch(closeContestSessionFormDialog());
    }

    const handleSubmit = () => {
        const dataSubmit = {
            id: id,
            exam_id: chosenExam ? chosenExam.id : null,
            name: contestSessionNameInputRef.current.value,
        }

        if (CheckValidInput(dataSubmit) === true) {
            if (contestSession === null) {
                dispatch(createContestSessionRequest(dataSubmit));
            }
            else
                dispatch(updateContestSessionRequest(dataSubmit));
        }
    }

    if (isOpen === false) return null;


    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {contestSession ? 'Chỉnh sửa đề thi' : 'Tạo mới ca thi'}
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
          </DialogContentText> */}
                    <TextField
                        style={{ marginBottom: "20px" }}
                        inputRef={contestSessionNameInputRef}
                        autoFocus
                        margin="dense"
                        label="Tên ca thi"
                        type="email"
                        fullWidth
                        variant="outlined"
                        error={!validInput.contestSessionName}
                        helperText={!validInput.contestSessionName ? "Dữ liệu không được để trống" : ""}
                    />
                    <Autocomplete
                        defaultValue={listExams.find(exam => exam.id === exam_id)}
                        id="combo-box-demo"
                        options={listExams}
                        value={chosenExam}
                        getOptionLabel={(option) => option.exam_name}
                        onChange={(event, newValue) => {
                            console.log(newValue);
                            setChosenExam(newValue)
                        }}
                        style={{ width: 300 }}
                        renderInput={(params) =>
                            <TextField {...params}
                                label="Đề thi"
                                variant="outlined"
                                error={!validInput.contestSessionExam}
                                helperText={!validInput.contestSessionExam ? "Bạn phải chọn đề thi" : ""}

                            />}
                    />
                    {/* <TextField
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
                    /> */}
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
