import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import User from './components/User';
import { UserManagement } from './components/UserManagement';
import VacationRequest from './components/VacationRequest';

import './custom.css'


export default () => (
    <Layout>
        <Route exact path='/' component={User} />
        <Route exact path='/vacationrequest' component={VacationRequest} />
        <Route exact path='/usermanagement' component={UserManagement} />
    </Layout>
);
