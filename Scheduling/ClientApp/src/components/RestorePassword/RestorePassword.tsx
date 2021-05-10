import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './RestorePassword.css';

import { validateEmail } from '../../Utils/utils';
import { restorePassword } from '../../webAPI/restorePassword';
import { LoadingAnimation } from '../Loading';

const RestorePassword: React.FunctionComponent = () => {
    
  const [email, setEmail] = useState("");
	const [showError, setError] = useState(false);
	const [emailSended, setEmailSended] = useState(false);
	const [isLoading, toggleLoaderAnimation] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		if(!validateEmail(email))
			return setError(true);
		
		toggleLoaderAnimation(true);
		
		const res = await restorePassword(email);
		
		toggleLoaderAnimation(false);
		return setEmailSended(res.data.sendResetPasswordLink);
	}

	const error = showError ? <p className='error-message'>Error! Incorrect email.</p> : null; 

	let page = (
		<form id='restore-password-form' onSubmit={handleSubmit}>
			<div className='center-aligner'>
					<h1>Restore password</h1>
			</div>

			<hr />
			
			<label className='restore-password-form-label' htmlFor='input-email'>Email:</label>
			<input onInput={event => setEmail(event.currentTarget.value)} id='input-email' className='restore-password-form-input' type='email' name='email' placeholder='example@mail.com' ></input>
			
			<div className='error-message-container'>
				{error}
			</div>
			
			<button id='restore-password-form-button' type='submit' >Send restore email</button>
			<Link to="/">return to login</Link>
		</form>
	);

	if(emailSended)
		page = <p>An email has been sent to your email address with instructions on how to reset your password. If you don't receive it within minutes, please make sure you provide the email address for your account and try again or contact us for assistance. <br/><Link to='/'>return to login</Link></p>;

	if(isLoading)
		page = <LoadingAnimation/>;

	return (
			<React.Fragment>
					<main id='restore-password-page'>
						{ page }
					</main>
			</React.Fragment>
	);
}


export default RestorePassword;