import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { ApplicationState } from '../../store/configureStore';
import { UserState } from '../../store/User/types';

interface PrivateRouteProps extends RouteProps {
	logined?: UserState
}

const PrivateRoute :React.FunctionComponent<PrivateRouteProps> = ({logined, ...rest}) => {
	return logined ? 
		<Route {...rest} />
		: <Redirect to='/login' />
}

const MapStateToProps = (store: ApplicationState) => {
	return {
		logined: store.loggedUser.logged
	}
}

export default connect(
	MapStateToProps,
	null
)(PrivateRoute);