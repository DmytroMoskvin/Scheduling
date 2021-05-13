import * as React from 'react';
import { useState } from 'react';
import '../style/Login.css';
import { authenticate } from '../webAPI/login';
import { getUserData } from '../webAPI/user';

type LoginProps = {
  logIn: Function,
  toggleLoading: Function,
  setError: Function
  showError: boolean
  token: string | null,
  setUserData: Function
}


export const LoginForm: React.FunctionComponent<LoginProps> = ({ logIn, toggleLoading, setError, showError, token, setUserData }) => {
    
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();

      if(!login || !password){
        return setError(true);
      }

      toggleLoading();
      
      const { data } = await authenticate(login, password);
      let userData = null;

      if(!data || !data.authentication){
        toggleLoading();
        return setError(true);
      }
      
      userData = await getUserData(data.authentication);
      logIn(data.authentication);
  
      setUserData(userData.data.getCurrentUser);
      
      setError(false);
      toggleLoading();
    }

    return (
        <React.Fragment>
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
                        <p className={'error-message' + (showError ? '' : ' hidden')}>Error! Incorrect login or passsword.</p>
                    </div>
                    <button id='login-form-button' type='button' onClick={handleSubmit}>LOGIN</button>
                </form>
            </main>
        </React.Fragment>
    );
}