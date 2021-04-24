import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../style/ResetPassword.css';
import { checkAccesToResetPassword, resetPassword } from '../webAPI/resetPassword';
import { Error403 } from './Error403';

interface IResetPasswordState {
	newPassword: string,
	confirmPassword: string,
	error: string,
	token: string,
	showMessage: boolean,
	showError403: boolean
}

export class ResetPassword extends React.Component<{}, IResetPasswordState> {
    
  constructor(props: Readonly<{}>){
		super(props);

		this.state = {
			newPassword: '',
			confirmPassword: '',
			error: '',
			token: window.location.href.replace(`${window.location.origin}/resetPassword/`, ''),
			showMessage: false,
			showError403: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount(){
		const res = await checkAccesToResetPassword(this.state.token);
		if(!res.data)
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

		if(this.state.newPassword != this.state.confirmPassword)
			return this.setError('Password mismatch.');
      
		this.setError('');

		const res = await resetPassword(this.state.newPassword, this.state.token);

		if(res.data && res.data.resetPassword == "The new password cannot match the current password."){
			return this.setError("The new password cannot match the current password.");
		}

		this.setState({
			showMessage: true
		});
	}

	render(){

		const error = this.state.error ?  <p className='error-message'>{this.state.error}</p> : null;
		const message = <p>Password changed successfully.<br/><Link to="/">Return home.</Link></p>

		const form = (
			<React.Fragment>
				<main id='reset-password-page'>
						<form id='reset-password-form' onSubmit={this.handleSubmit}>
								<div className='center-aligner'>
										<h1>Reset password</h1>
								</div>
								<hr/>
								
								<input onInput={event => this.setState({newPassword: event.currentTarget.value})} id='input-new-password' className='reset-password-form-input' type='text' name='new-password' placeholder='New password' ></input>
								<input onInput={event => this.setState({confirmPassword: event.currentTarget.value})} id='input-confirm-password' className='reset-password-form-input' type='text' name='confirm-password' placeholder='Confirm password'></input>
								
								<div className='error-message-container'>
									{error}
								</div>
								
								<button id='reset-password-form-button' type='submit'>Reset password</button>
								<Link to='/'>return to login</Link>
						</form>
				</main>
			</React.Fragment>
		);

		return (
			this.state.showError403 ? <Error403 /> 
			: (this.state.showMessage ? message : form)
		);
	}
}