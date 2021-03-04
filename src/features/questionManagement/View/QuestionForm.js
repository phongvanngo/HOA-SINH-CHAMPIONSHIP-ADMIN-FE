import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import React, { useEffect, useRef, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestionRequest, createQuestionRequest, updateQuestionRequest } from './../questionSlice';
import { useParams } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '5px',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function CenteredGrid() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { exam_id } = useParams();
    const content_ref = useRef(null);
    const image_ref = useRef(null);
    const answerA_ref = useRef(null);
    const answerB_ref = useRef(null);
    const answerC_ref = useRef(null);
    const answerD_ref = useRef(null);
    const answerE_ref = useRef(null);
    const editingQuestion = useSelector(state => state.question.editingQuestion);
    const hasEditRequest = useSelector(state => state.question.hasEditRequest);


    const { id, content, image, answerA, answerB, answerC, answerD, answerE, correctAnswer } = editingQuestion || {};

    const [questionImage, setQuestionImage] = useState(image);
    const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState(correctAnswer || 'A');

    const handleChangeCorrectAnswer = (event) => {
        setCurrentCorrectAnswer(event.target.value);
    };

    console.log("question form render", editingQuestion, hasEditRequest);

    useEffect(() => {
        //khi có yêu cầu sửa câu khác
        console.log("request -- render");
        if (hasEditRequest === true && editingQuestion !== null) {
            saveData();
        };

    }, [hasEditRequest])


    useEffect(() => {
        console.log("editing -- render");
        try {
            content_ref.current.value = content;
            image_ref.current.value = image;
            answerA_ref.current.value = answerA;
            answerB_ref.current.value = answerB;
            answerC_ref.current.value = answerC;
            answerD_ref.current.value = answerD;
            answerE_ref.current.value = answerE;
            setCurrentCorrectAnswer(correctAnswer);
            setQuestionImage(image);

        } catch (error) {
            console.log(error);
        }
    }, [editingQuestion]);


    const getInputData = () => {
        try {
            const questionInfo = {
                content: content_ref.current.value,
                image: image_ref.current.value,
                answerA: answerA_ref.current.value,
                answerB: answerB_ref.current.value,
                answerC: answerC_ref.current.value,
                answerD: answerD_ref.current.value,
                answerE: answerE_ref.current.value,
                correctAnswer: currentCorrectAnswer,
            };
            return questionInfo;
        } catch (error) {
            return null;
        }
    }

    const saveData = () => {
        const questionInfo = getInputData();
        if (questionInfo === null) return;
        let newQuestion = {
            ...questionInfo,
            exam_id: exam_id
        }

        let question_id = editingQuestion.id;
        // dispatch(updateQuestionRequest({ id: question_id, ...newQuestion, }));

        if (question_id === null) {
            //tạo câu hỏi mới   
            dispatch(createQuestionRequest(newQuestion));
        }
        else {
            //update câu hỏi cũ
            dispatch(updateQuestionRequest({ id: question_id, ...newQuestion, }));
        }
    }

    const handleSaveData = () => {
        saveData();
    }

    const handleDeleteQuestion = () => {
        dispatch(deleteQuestionRequest(id));
    }

    if (editingQuestion === null) return (<div></div>);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Button
                        onClick={() => { handleSaveData() }}
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        style={{ float: 'left', marginRight: '5px' }}
                    >
                        Lưu
      </Button>
                    <Button
                        onClick={() => { handleDeleteQuestion() }}
                        size="small"
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        style={{ float: 'left' }}
                    >
                        Xóa
      </Button>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={9}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField

                                            label="Nội dung câu hỏi"
                                            multiline
                                            rows={3}
                                            rowsMax={10}
                                            style={{ width: "100%" }}
                                            inputRef={content_ref}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={(e) => { setQuestionImage(e.target.value) }}
                                            label="Hình ảnh"
                                            style={{ width: "100%" }}
                                            inputRef={image_ref}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper className={classes.paper} style={{ width: '100%', height: '100%' }}>
                                <img style={{ maxWidth: '150px', maxHeight: "150px", }} src={questionImage} alt="hình ảnh câu hỏi" />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper} style={{ textAlign: 'left' }}>
                        <FormControl component="fieldset" style={{ width: '100%' }}>
                            <FormLabel component="legend" style={{ marginBottom: "10px" }}>Phần đáp án</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={currentCorrectAnswer} onChange={handleChangeCorrectAnswer} >
                                <div className="answer-item">
                                    <FormControlLabel value="A" control={<Radio />} style={{ paddingTop: '15px' }} />
                                    <TextField
                                        label="Đáp án A"
                                        style={{ width: "100%" }}
                                        inputRef={answerA_ref}

                                    />
                                </div>
                                <div className="answer-item">
                                    <FormControlLabel value="B" control={<Radio />} style={{ paddingTop: '15px' }} />
                                    <TextField

                                        label="Đáp án B"
                                        style={{ width: "100%" }}
                                        inputRef={answerB_ref}

                                    />
                                </div>
                                <div className="answer-item">
                                    <FormControlLabel value="C" control={<Radio />} style={{ paddingTop: '15px' }} />
                                    <TextField

                                        label="Đáp án C"
                                        style={{ width: "100%" }}
                                        inputRef={answerC_ref}

                                    />
                                </div>
                                <div className="answer-item">
                                    <FormControlLabel value="D" control={<Radio />} style={{ paddingTop: '15px' }} />
                                    <TextField

                                        label="Đáp án D"
                                        style={{ width: "100%" }}
                                        inputRef={answerD_ref}

                                    />
                                </div>
                                <div className="answer-item">
                                    <FormControlLabel value="E" control={<Radio />} style={{ paddingTop: '15px' }} />
                                    <TextField

                                        label="Đáp án E"
                                        style={{ width: "100%" }}
                                        inputRef={answerE_ref}

                                    />
                                </div>

                            </RadioGroup>
                        </FormControl>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
}
