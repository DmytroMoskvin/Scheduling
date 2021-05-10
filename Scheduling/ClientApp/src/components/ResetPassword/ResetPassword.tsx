import * as React from 'react';
import { Link } from 'react-router-dom';

import './ResetPassword.css';

import { checkAccessToResetPassword, resetPassword } from '../../webAPI/resetPassword';
import Error from '../ErrorPage/ErrorPage';
import { LoadingAnimation } from '../Loading';


interface IResetPasswordState {
	newPassword: string,
	confirmPassword: string,
	error: string,
	token: string,
	showMessage: boolean,
	showError403: boolean,
	isLoading: boolean
}

export default class ResetPassword extends React.Component<{}, IResetPasswordState> {
    
  constructor(props: Readonly<{}>){
		super(props);

		this.state = {
			newPassword: '',
			confirmPassword: '',
			error: '',
			token: window.location.href.replace(`${window.location.origin}/resetPassword/`, ''),
			showMessage: false,
			showError403: false,
			isLoading: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount(){
		const res = await checkAccessToResetPassword(this.state.token);
		if(res.data && res.data.checkAccessToResetPasswordPage)
			return;
		
		this.setState({ showError403: true })
	}

	setError(error: string){
		this.setState({error});
	}

  async handleSubmit(event: { preventDefault: () => void; })  {
		event.preventDefault();

		if(!this.state.newPassword.length || !this.state.confirmPassword.length)
			return this.setError('All fields must be filled.');

		if(this.state.newPassword.length < 8)
			return this.setError('Password is too short.');

		if(this.state.newPassword !== this.state.confirmPassword)
			return this.setError('Password mismatch.');
      
		this.setError('');
		this.toggleLoader();

		const res = await resetPassword(this.state.newPassword, this.state.token);

		this.toggleLoader();

		if(res.data && res.data.resetPassword === "The new password cannot match the current password."){
			return this.setError("The new password cannot match the current password.");
		}

		this.setState({
			showMessage: true
		});
	}

	toggleLoader(){
		this.setState({ isLoading: !this.state.isLoading });
	}

	render(){

		const error = this.state.error ?  <p className='error-message'>{this.state.error}</p> : null;

		let page = (
			<React.Fragment>
				<main id='reset-password-page'>
						<form id='reset-password-form' onSubmit={this.handleSubmit}>
								<div className='center-aligner'>
										<h1>Reset password</h1>
								</div>
								<hr/>
								
								<input onInput={event => this.setState({newPassword: event.currentTarget.value})} id='input-new-password' className='reset-password-form-input' type='password' name='new-password' placeholder='New password' ></input>
								<input onInput={event => this.setState({confirmPassword: event.currentTarget.value})} id='input-confirm-password' className='reset-password-form-input' type='password' name='confirm-password' placeholder='Confirm password'></input>
								
								<div className='error-message-container'>
									{error}
								</div>
								
								<button id='reset-password-form-button' type='submit'>Reset password</button>
								<Link to='/'>return to login</Link>
						</form>
				</main>
			</React.Fragment>
		);

		if(this.state.isLoading)
			page = <LoadingAnimation />;

		if(this.state.showMessage)
			page = <p>Password changed successfully.<br/><Link to="/">Return home.</Link></p>;

		if(this.state.showError403)
			page = <Error message="Error 403. Forbidden." />

		return page;
	}
}