import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeContestSessionRequest, createContestSession, deactiveContestSessionRequest, deleteContestSessionRequest, editContestSession, fetchContestSessionRequest } from '../ContestSessionSlice';
import ContestSessionItem from './SessionItem';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '100%',
        margin: 'auto'
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexWrap: 'wrap',
    },
    title: {
        margin: theme.spacing(2, 0, 2),
    },
    buttonCreateContestSession: {
        opacity: 0.4,
        '&:hover': {
            opacity: 1
        }
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginBottom: '10px',
    },
}));

export default function InteractiveList() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const contestSessions = useSelector(state => state.contestSession.listContestSessions);

    console.log(contestSessions);

    React.useEffect(() => {
        console.log("fetch data");
        dispatch(fetchContestSessionRequest({}));
    }, [dispatch])

    const handleDeleteContestSession = (question_id) => {
        if (window.confirm(`Bạn có chắc chắn xóa`)) {
            dispatch(deleteContestSessionRequest(question_id));
        }
    }

    const handleCreateContestSession = () => {
        dispatch(createContestSession());
    }

    const handleEditContestSession = (contestSessionInfo) => {
        dispatch(editContestSession(contestSessionInfo));
    }

    const handleToggleContestSession = (is_active, id) => {
        if (is_active === true)
            dispatch(deactiveContestSessionRequest(id))
        else
            dispatch(activeContestSessionRequest(id))
    }

    const handleOpenContestSession = ((detailedContestSession) => {
        // dispatch(chooseContestSession(detailedContestSession));
        // history.push(`${DashboardRoutes.QUESTION_MANAGEMENT}/${detailedContestSession.id}`);
    })

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography
                        variant="h6" className={classes.title}>
                        Danh sách ca thi
                    <IconButton
                            className={classes.buttonCreateContestSession}
                            onClick={handleCreateContestSession}
                        >
                            <AddToPhotosIcon />
                        </IconButton>
                    </Typography>

                    <Paper className={classes.paper}>
                        <h3>Bảng cá nhân</h3>
                        <div className={classes.demo}>
                            {contestSessions.map((contestSession, index) =>
                            (contestSession.type === 1 ?
                                <ContestSessionItem
                                    key={index}
                                    detailedContestSession={contestSession}
                                    handleDeleteContestSession={handleDeleteContestSession}
                                    handleEditContestSession={handleEditContestSession}
                                    handleOpenContestSession={handleOpenContestSession}
                                    handleToggleContestSession={handleToggleContestSession}
                                /> : ""))
                            }
                        </div>
                    </Paper>

                    <Paper className={classes.paper}>
                        <h3>Bảng đội</h3>
                        <div className={classes.demo}>
                            {contestSessions.map((contestSession, index) =>
                            (contestSession.type === 2 ?
                                <ContestSessionItem
                                    key={index}
                                    detailedContestSession={contestSession}
                                    handleDeleteContestSession={handleDeleteContestSession}
                                    handleEditContestSession={handleEditContestSession}
                                    handleOpenContestSession={handleOpenContestSession}
                                    handleToggleContestSession={handleToggleContestSession}
                                /> : ""))
                            }
                        </div>
                    </Paper>
                    {/* 
                        {contestSessions.map((contestSession, index) =>
                            <ContestSessionItem
                                key={index}
                                detailedContestSession={contestSession}
                                handleDeleteContestSession={handleDeleteContestSession}
                                handleEditContestSession={handleEditContestSession}
                                handleOpenContestSession={handleOpenContestSession}
                                handleToggleContestSession={handleToggleContestSession}
                            />)} */}
                    {/* <List>
                        </List>
                        <List >
                            {contestSessions.map((contestSession, index) =>
                                <ContestSessionItem
                                    key={index}
                                    detailedContestSession={contestSession}
                                    handleDeleteContestSession={handleDeleteContestSession}
                                    handleEditContestSession={handleEditContestSession}
                                    handleOpenContestSession={handleOpenContestSession}
                                />)}
                        </List> */}
                </Grid>
            </Grid>
        </div >
    );
}