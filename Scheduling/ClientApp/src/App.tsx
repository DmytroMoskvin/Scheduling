import * as React from 'react';
import { Route, Switch } from 'react-router';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Layout from './components/Layout';

import ResetPassword from './components/ResetPassword/ResetPassword';
import RestorePassword from './components/RestorePassword/RestorePassword';
import TimerPage from './components/Timer/TimerPage';
import VacationRequest from './components/VacationRequest';
import MainPage from './components/MainPage';
import Login from './components/LoginPage/Login';

import Error from './components/ErrorPage/ErrorPage';

import AppCalendar from './components/calendarComponent/app/index';

import './custom.css'


export default () => (
    <Layout>
        <Switch>
            <Route exact path='/restorePassword' component={RestorePassword} />
            <Route exact path='/resetPassword/:token' component={ResetPassword} />
            <Route exact path='/resetPassword'>
                <Error message='Error 403. Forbidden.' />
            </Route>
            <Route exact path='/login' component={Login} />

            <PrivateRoute exact path='/VacationRequest' component={VacationRequest} />
            <PrivateRoute exact path='/Timer' component={TimerPage} />
            <PrivateRoute exact path='/' component={MainPage} />
            <Route exact path='/calendar' component={AppCalendar} />
            <Route>
                <Error message='Error 404. Page not found.' />
            </Route>
        </Switch>
    </Layout>
);