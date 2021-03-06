import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useRef, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';


import { createUserRequest } from './../UserSlice';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'left',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    headerArea: {
        marginBottom: '10px',
    },
    buttonCreate: {
        '&:after': {
            clear: 'both',
            content: '',
            display: 'Block',
        },
        float: 'right'
    }
}));

export default function CenteredGrid() {
    const classes = useStyles();
    const dispatch = useDispatch();
    let listContestSessions = useSelector(state => state.contestSession.listContestSessions) || [];

    const userNameInputRef = useRef(null)
    const prefixInputRef = useRef(null)

    const inititalValidInput = {
        userName: true,
        sessionID: true
    }

    const [validInput, setValidInput] = useState(inititalValidInput);
    const [choosenSessionID, setChosenSessionID] = useState(null);

    const checkValidInput = (dataSubmit) => {
        let valid = true;
        let validInputDetail = inititalValidInput;
        const { name, sessionID } = dataSubmit;


        if (name.trim() === "") {
            valid = false;
            validInputDetail.userName = false;
        }
        if (sessionID === null) {
            valid = false;
            validInputDetail.sessionID = false;
        }


        if (valid === false) {
            setValidInput(validInputDetail);
            return false;
        }
        else
            return true;
    }


    const handleChangeSession = (event, newValue) => {
        setChosenSessionID(newValue);

    }



    const handleSubmit = () => {
        const shortid = Math.random().toString(36).substr(2, 5);
        const userInfo = {
            name: userNameInputRef.current.value,
            code: `${prefixInputRef.current.value}${shortid}`,
            sessionID: choosenSessionID ? choosenSessionID.id : null
        }

        if (checkValidInput(userInfo) === false) return;

        dispatch(createUserRequest(userInfo));

        setValidInput(inititalValidInput);


    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.headerArea}>
                    <h3 style={{ display: 'inline', verticalAlign: 'bottom', }}>Tạo mã dự thi</h3>
                    <Button
                        className={classes.buttonCreate}
                        variant="contained"
                        color="default"
                        size='small'
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleSubmit}
                    >
                        Tạo
      </Button>
                </div>
                <Divider />
                <FormControl component="fieldset" style={{ marginTop: '10px', width: '100%' }}>
                    <TextField
                        inputRef={userNameInputRef}
                        id="outlined-basic"
                        style={{ marginTop: '10px', width: '100%' }}
                        variant="outlined"
                        label="Tên thí sinh (Tên đội)"
                        error={!validInput.userName}
                        helperText={!validInput.userName ? "Dữ liệu không được để trống" : ""}

                    />
                    <TextField
                        inputRef={prefixInputRef}
                        id="outlined-basic"
                        style={{ marginTop: '10px' }}
                        variant="outlined"
                        label="Tiền tố" />
                    <Autocomplete
                        options={listContestSessions}
                        onChange={handleChangeSession}
                        getOptionLabel={(option) => option.name}
                        style={{ width: '100%', marginTop: '10px' }}
                        renderInput=
                        {(params) =>
                            <TextField {...params}
                                variant="outlined"
                                label="Ca thi"
                                error={!validInput.sessionID}
                                helperText={!validInput.sessionID ? "Phải chọn ca thi" : ""}
                            />}
                    />
                </FormControl>
            </Paper>
        </div >
    );
}