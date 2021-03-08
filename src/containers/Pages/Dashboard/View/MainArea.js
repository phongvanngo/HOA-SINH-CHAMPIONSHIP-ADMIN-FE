import React, { lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { DashboardRoutes } from "./../../../../routes.const";

const ExamManagement = lazy(() => import('./../../../../features/examManagement/ExamManagement'));
const QuestionManagement = lazy(() => import('./../../../../features/questionManagement/QuestionManagement'));
const UserManagement = lazy(() => import('./../../../../features/userManagement/UserManagement'));
const ContestSessionManagement = lazy(() => import('../../../../features/ContestSessionManagement/SessionManagement'));
const UniversityManagement = lazy (()=> import('./../../../../features/universityManagement/UniversityManagment'));

const NotFound = lazy(() => import('./../../../Pages/NotFound/NotFound'));

export default function MainArea() {
    const match = useRouteMatch();
    const { EXAM_MANAGEMENT, COMPETITION_MANAGEMENT, USER_MANAGEMENT, QUESTION_MANAGEMENT,UNIVERSITY_MANAGEMENT } = DashboardRoutes;
    return (
        <React.Fragment>
            <Switch>
                <Redirect exact from={match.url} to={COMPETITION_MANAGEMENT} />
                <Route path={COMPETITION_MANAGEMENT} component={ContestSessionManagement} />
                <Route path={EXAM_MANAGEMENT} component={ExamManagement} />
                <Route path={`${QUESTION_MANAGEMENT}/:exam_id`} component={QuestionManagement} />
                <Route path={USER_MANAGEMENT} component={UserManagement} />
                <Route path={UNIVERSITY_MANAGEMENT} component={UniversityManagement} />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    )
}
