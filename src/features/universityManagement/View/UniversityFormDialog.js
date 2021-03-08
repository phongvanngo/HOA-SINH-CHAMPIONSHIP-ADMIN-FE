import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUniversityRequest, closeUniversityFormDialog, updateUniversityRequest } from '../UniversitySlice';
export default function UniversityFormDialog() {

    const isOpen = useSelector(state => state.university.isUniversityDialogOpen);
    let university = useSelector(state => state.university.universityEditing);
    const dispatch = useDispatch();

    const { id, university_name } = university || {};


    const universityNameInputRef = useRef(null);

    const inititalValidInput = {
        universityName: true,
    }
    const [validInput, setValidInput] = useState(inititalValidInput);

    const [flag, setFlag] = useState(0);


    useEffect(() => {
        if (isOpen === true) {
            // setChosenExam(null);
            //nếu sửa ca thi, setFlag để render lại và lấy ref của input
            if (university !== null) {
                setFlag(flag+1);
            }
        } else {
            setValidInput(inititalValidInput);
        }
    }, [isOpen])

    useEffect(() => {
        //nếu sửa ca thi
        try {
            universityNameInputRef.current.value = university_name;
        } catch (error) {

        }

    }, [flag])

    const CheckValidInput = (dataSubmit) => {
        let valid = true;
        let validInputDetail = inititalValidInput;
        const { university_name} = dataSubmit;


        if (university_name.trim() === "") {
            valid = false;
            validInputDetail.universityName = false;
        }

        if (valid === false) {
            setValidInput(validInputDetail);
            return false;
        }
        else
            return true;
    }

    const handleClose = () => {
        dispatch(closeUniversityFormDialog());
    }

    const handleSubmit = () => {
        const dataSubmit = {
            id: id,
            university_name: universityNameInputRef.current.value,
        }

        if (CheckValidInput(dataSubmit) === true) {
            if (university === null)
                dispatch(createUniversityRequest(dataSubmit));
            else
                dispatch(updateUniversityRequest(dataSubmit));

            dispatch(closeUniversityFormDialog());
        }
    }

    if (isOpen === false) return null;

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {university ? 'Chỉnh sửa trường đại học' : 'Tạo mới trường đại học'}
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
          </DialogContentText> */}
                    <TextField
                        style={{ marginBottom: "20px" }}
                        inputRef={universityNameInputRef}
                        autoFocus
                        margin="dense"
                        label="Tên trường đại học"
                        type="email"
                        fullWidth
                        variant="outlined"
                        error={!validInput.universityName}
                        helperText={!validInput.universityName ? "Dữ liệu không được để trống" : ""}
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
