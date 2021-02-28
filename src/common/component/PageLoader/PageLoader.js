import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function SimpleBackdrop() {
    const classes = useStyles();

    const isLoading = useSelector(state => state.loading.isLoading);


    return (
        <div>
            <Backdrop className={classes.backdrop} open={isLoading} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
