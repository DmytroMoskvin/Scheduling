import * as React from 'react';
import './style.css';
import profileImage from '../../pictures/profileImage.png'
import { UserData } from '../../store/User/types';

import './style.css';
import AvailableVacationTime from "../AvailableVacationTime";
import Cookies from "js-cookie";

type ProfileProps = {
    user: UserData
}

const Profile: React.FunctionComponent<ProfileProps> = ({ user }) => {
    if(user)
    return (
        <div className="profile">
            <h2>My Info</h2>

            <img src={profileImage} className="profile-picture" alt="Profile picture" />
            <p className="profile-text">{user.name} {user.surname}</p>
            <p className="profile-text">{user.position}</p>
            <p className="profile-text">{user.department}</p>

            <br/>
            <AvailableVacationTime token={Cookies.get('token') || ""}/>
        </div>
    );
    return (
        <React.Fragment>
            
        </React.Fragment>
    );
}

export default Profile;