import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { ApplicationState } from '../../store/configureStore';
import { actionCreators } from '../../store/User/actions';

import './Login.css';

import { validateEmail } from '../../Utils/utils';
import { authenticate } from '../../webAPI/login';
import { getUserData } from '../../webAPI/user';
import { LoadingAnimation } from '../Loading';

type LoginProps = {
  	logIn: Function,
  	setUserData: Function,
	logined: boolean
}

const Login: React.FunctionComponent<LoginProps> = ({ logIn, setUserData, logined }) => {
    
	const [login, setLogin] = useState("");
  	const [password, setPassword] = useState("");
  	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

  	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		if(!validateEmail(login)){
			return setErrorMessage('Error! Incorrect email.');
		}

		if(!login || !password){
			return setErrorMessage('Error! Incorrect login or passsword.');
		}

		setIsLoading(true);
		console.log(isLoading);

		const { data } = await authenticate(login, password);
		let userData = null;

		if(!data || !data.authentication){
			return setErrorMessage('Error! Incorrect login or passsword.');
    	}



		userData = await getUserData(data.authentication);
		logIn(data.authentication);
		
		setIsLoading(false);

		setUserData(userData.data.getCurrentUser); 
		
		setErrorMessage('');
    }

	let page = (
		<main id='login-page'>
			<form id='login-form'>
				<div className='center-aligner'>
					<h1>Login</h1>
				</div>
				<hr/>
				<label className='login-form-label' htmlFor='input-login'>Login:</label>
				<input onInput={event => setLogin(event.currentTarget.value)} id='input-login' className='login-form-input' type='text' name='login' placeholder='Login' ></input>
				<label className='login-form-label' htmlFor='input-password'>Password:</label>
				<input onInput={event => setPassword(event.currentTarget.value)} id='input-password' className='login-form-input' type='password' name='password' placeholder='Password'></input>
				<div className='error-message-container'>
					{!!errorMessage ? <p className='error-message'>{errorMessage}</p>: null}
				</div>
				<button id='login-form-button' type='button' onClick={handleSubmit}>LOGIN</button>
				<p className='restore-password'><Link to='/restorePassword'>Forgot your password?</Link> </p>
			</form>
		</main>
	);

	if(isLoading){
		page = <LoadingAnimation />;
	}

	if(logined){
		page = <Redirect to='/' />
	}

    return (
			<React.Fragment>
				{ page }
			</React.Fragment>
    );
}

const mapStateToProps = (store: ApplicationState) => {
	return {
		logined: store.loggedUser.logged
	}
}

export default connect(
	mapStateToProps,
	actionCreators
)(Login);