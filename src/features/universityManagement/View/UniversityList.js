import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chooseUniversity, createUniversity, deleteUniversityRequest, editUniversity, fetchUniversityRequest } from '../UniversitySlice';
import UniversityItem from './UniversityItem';
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
    buttonCreateUniversity: {
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

    const universitys = useSelector(state => state.university.listUniversitys);
    // console.log()

    React.useEffect(() => {
        console.log("fetch data");
        dispatch(fetchUniversityRequest({}));
    }, [dispatch])

    const handleDeleteUniversity = (question_id) => {
        if (window.confirm(`Bạn có chắc chắn xóa`)) {
            dispatch(deleteUniversityRequest(question_id));
        }
    }

    const handleCreateUniversity = () => {
        dispatch(createUniversity());
    }

    const handleEditUniversity = (universityInfo) => {
        dispatch(editUniversity(universityInfo));
    }



    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography
                        variant="h6" className={classes.title}>
                        Danh sách trường đại học
                    <IconButton
                            className={classes.buttonCreateUniversity}
                            onClick={handleCreateUniversity}
                        >
                            <AddToPhotosIcon />
                        </IconButton>
                    </Typography>
                    <div className={classes.demo}>
                        <List>
                        </List>
                        <List >
                            {universitys.map((university, index) =>
                                <UniversityItem
                                    key={index}
                                    detailedUniversity={university}
                                    handleDeleteUniversity={handleDeleteUniversity}
                                    handleEditUniversity={handleEditUniversity}
                                />)}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}