import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chooseContestSession, createContestSession, deleteContestSessionRequest, editContestSession, fetchContestSessionRequest } from '../ContestSessionSlice';
import ContestSessionItem from './SessionItem';
import { useHistory } from 'react-router-dom';
import { DashboardRoutes } from '../../../routes.const';

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
    buttonCreateContestSession: {
        opacity: 0.4,
        '&:hover': {
            opacity: 1
        }
    }
}));

export default function InteractiveList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const contestSessions = useSelector(state => state.contestSession.listContestSessions);

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
                        Danh sách đề thi
                    <IconButton
                            className={classes.buttonCreateContestSession}
                            onClick={handleCreateContestSession}
                        >
                            <AddToPhotosIcon />
                        </IconButton>
                    </Typography>
                    <div className={classes.demo}>
                        <List>
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
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}