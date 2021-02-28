import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamRequest, deleteExamRequest, createExam, editExam } from './../ExamSlice';
import ExamItem from './ExamItem';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
        margin: 'auto'
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(2, 0, 2),
    },
    buttonCreateExam: {
        opacity: 0.4,
        '&:hover': {
            opacity: 1
        }
    }
}));

export default function InteractiveList() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const exams = useSelector(state => state.exam.listExams);

    React.useEffect(() => {
        console.log("fetch data");
        dispatch(fetchExamRequest({}));
    }, [dispatch])

    const handleDeleteExam = (question_id) => {
        if (window.confirm(`Bạn có chắc chắn xóa`)) {
            dispatch(deleteExamRequest(question_id));
        }
    }

    const handleCreateExam = () => {
        dispatch(createExam());
    }

    const handleEditExam = (examInfo) => {
        dispatch(editExam(examInfo));
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography
                        variant="h6" className={classes.title}>
                        Danh sách đề thi
                    <IconButton
                            className={classes.buttonCreateExam}
                            onClick={handleCreateExam}
                        >
                            <AddToPhotosIcon />
                        </IconButton>
                    </Typography>
                    <div className={classes.demo}>
                        <List>
                        </List>
                        <List >
                            {exams.map((exam, index) =>
                                <ExamItem
                                    key={index}
                                    examDetail={exam}
                                    handleDeleteExam={handleDeleteExam}
                                    handleEditExam={handleEditExam}
                                />)}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}