import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSession } from './../UserSlice';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'left',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        marginBottom: '10px'
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

    listContestSessions = [
        ...listContestSessions, 
        {
            id:null,
            name:'Tất cả ca thi'
        }]
    
    
    const handleChangeSession = (event, newValue) => {
        if (newValue !== null) dispatch(changeSession(newValue.id));
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <h3 style={{ marginBottom: '0px' }}>Bộ lọc</h3>
                <Divider />
                <FormControl component="fieldset" style={{ marginTop: '10px', width: "100%" }}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={listContestSessions}
                        onChange={handleChangeSession}
                        getOptionLabel={(option) => option.name}
                        style={{ width: '100%', marginTop: '10px' }}
                        renderInput={(params) => <TextField size="small" {...params} variant="outlined" label="Ca thi" />}
                    />
                </FormControl>
            </Paper>
        </div >
    );
}