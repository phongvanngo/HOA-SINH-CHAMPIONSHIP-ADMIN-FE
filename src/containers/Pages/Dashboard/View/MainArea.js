import React, { lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { DashboardRoutes } from "./../../../../routes.const";

const ExamManagement = lazy(() => import('./../../../../features/examManagement/ExamManagement'));
const QuestionManagement = lazy(() => import('./../../../../features/questionManagement/QuestionManagement'));
const UserManagement = lazy(() => import('./../../../../features/userManagement/UserManagement'));
const CompetitionManagement = lazy(() => import('./../../../../features/competitionManagement/CompetitionManagement'));

const NotFound = lazy(() => import('./../../../Pages/NotFound/NotFound'));

export default function MainArea() {
    const match = useRouteMatch();
    const { EXAM_MANAGEMENT, COMPETITION_MANAGEMENT, USER_MANAGEMENT } = DashboardRoutes;
    return (
        <React.Fragment>
            <Switch>
                <Redirect exact from={match.url} to={COMPETITION_MANAGEMENT} />
                <Route path={COMPETITION_MANAGEMENT} component={CompetitionManagement} />
                <Route path={EXAM_MANAGEMENT} component={ExamManagement} />
                <Route path={EXAM_MANAGEMENT} component={QuestionManagement} />
                <Route path={USER_MANAGEMENT} component={UserManagement} />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    )
}
