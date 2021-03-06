import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeUserFormDialog, createUserRequest, updateUserRequest } from '../UserSlice';
export default function UserFormDialog() {

    const isOpen = useSelector(state => state.user.isUserDialogOpen);
    let user = useSelector(state => state.user.userEditing);
    const dispatch = useDispatch();

    const { id, name } = user || {};


    const userNameInputRef = useRef(null);

    const inititalValidInput = {
        userName: true,
    }
    const [validInput, setValidInput] = useState(inititalValidInput);

    const [flag, setFlag] = useState(0);

    useEffect(() => {
        if (isOpen === true) {
            // setChosenExam(null);
            //nếu sửa thí sinh, setFlag để render lại và lấy ref của input
            if (user !== null) {
                setFlag(flag + 1);
            }
        } else {
        }
    }, [isOpen])

    useEffect(() => {
        //nếu sửa ca thi
        try {
            userNameInputRef.current.value = name;
        } catch (error) {

        }

    }, [flag])

    const CheckValidInput = (dataSubmit) => {
        let valid = true;
        let validInputDetail = inititalValidInput;
        const { name } = dataSubmit;


        if (name.trim() === "") {
            valid = false;
            validInputDetail.userName = false;
        }


        if (valid === false) {
            setValidInput(validInputDetail);
            return false;
        }
        else
            return true;
    }

    const handleClose = () => {
        dispatch(closeUserFormDialog());
    }

    const handleSubmit = () => {
        const dataSubmit = {
            id: id,
            name: userNameInputRef.current.value,
        }

        if (CheckValidInput(dataSubmit) === true) {
            dispatch(updateUserRequest(dataSubmit));

            dispatch(closeUserFormDialog());
        }
    }

    if (isOpen === false) return null;


    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {user ? 'Chỉnh sửa dữ liệu thí sinh' : ''}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        style={{ marginBottom: "20px" }}
                        inputRef={userNameInputRef}
                        autoFocus
                        margin="dense"
                        label="Tên thí sinh"
                        type="email"
                        fullWidth
                        variant="outlined"
                        error={!validInput.userName}
                        helperText={!validInput.userName ? "Dữ liệu không được để trống" : ""}
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
