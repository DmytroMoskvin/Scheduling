import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import User from './components/User';
import UserManagement from './components/UserManagement/UserManagement';
import CreateUserForm from './components/UserManagement/CreateUserForm';
import EditUserForm from './components/UserManagement/EditUserForm';
import VacationRequest from './components/VacationRequest';

import './custom.css'


export default () => (
    <Layout>
        <Switch>
        <Route exact path='/' component={User} />
        <Route exact path='/vacationrequest' component={VacationRequest} />
        <Route exact path='/createuser' component={CreateUserForm} />
        <Route exact path='/edituser' component={EditUserForm} />
        <ProtectedRoute exact path='/usermanagement' component={UserManagement} />
        </Switch>
    </Layout>
);
