import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MainContainer.css';
import UserCodeForm from './UserCodeForm';
import FilterArea from './FilterArea';
import UserList from './UserList';
import SearchArea from './SearchArea';
import { fetchContestSessionRequest } from './../../ContestSessionManagement/ContestSessionSlice';
import { fetchUniversityRequest} from './../../universityManagement/UniversitySlice';


export default function QuestionManagement() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchContestSessionRequest({}));
        dispatch(fetchUniversityRequest({}));
    }, [])


    return (
        <React.Fragment>
            <div className="question-management-title">
                <Typography variant="h6" style={{ textAlign: "left" }}>
                    Quản lý thí sinh dự thi
</Typography>
                <Grid container spacing={3}>
                    <Grid item md={3} xs={12}>
                        <Grid item xs={12}>
                            <SearchArea />
                        </Grid>
                        <Grid item xs={12}>
                            <FilterArea />
                        </Grid>
                        <Grid item xs={12}>
                            <UserCodeForm />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <UserList />
                    </Grid>

                </Grid>
            </div>
        </React.Fragment>
    )
}
