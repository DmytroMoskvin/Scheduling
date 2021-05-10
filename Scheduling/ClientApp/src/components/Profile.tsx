import * as React from 'react';
import '../style/Profile.css';
import profileImage from '../pictures/profileImage.png'
import { UserData } from '../store/User/types';

type ProfileProps = {
    user: UserData,
    logOut: Function
}

export const ProfileForm: React.FunctionComponent<ProfileProps> = ({ user, logOut }) => {
    if(user)
    return (
        <React.Fragment>
            <main id='login-page'>
                <form id='user-form'>
                    <div id='user-form-picture-div'>
                        <img id='user-form-picture' src={profileImage} alt='UserPicture'/>
                    </div>
                    <div id='user-form-greeting'>
                        <h1>Wellcome, {user.name}!</h1>
                    </div>
                    <div id='user-form-info'>
                        <div>
                            <label>Name:</label>
                            <h4>{user.name}</h4>
                        </div>
                        <div>
                            <label>Department:</label>
                            <h4>{user.department}</h4>
                        </div>
                        <div>
                            <label>Surname:</label>
                            <h4>{user.surname}</h4>
                        </div>
                        <div>
                            <label>Position:</label>
                            <h4>{user.position}</h4>
                        </div>
                        <div>
                            <label>E-mail:</label>
                            <h4>{user.email}</h4>
                        </div>
                    </div>
                    <div id='user-form-buttons'>
                        <button id='logout-button' type='button' onClick={() => logOut()}>LOGOUT</button>
                    </div>
                </form>
            </main>
        </React.Fragment>
    );
    return (
        <React.Fragment>
            
        </React.Fragment>
    );
}