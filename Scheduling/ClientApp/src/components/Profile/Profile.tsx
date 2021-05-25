import * as React from 'react';
import profileImage from '../../pictures/profileImage.png'
import { UserData } from '../../store/User/types';
<<<<<<< HEAD
import {Link} from "react-router-dom";
import { TotalWorkTime } from '../TotalWorkTime/TotalWorkTime';
=======
import { TotalWorkTime } from '../TotalWorkTime/TotalWorkTime';
import { Link } from "react-router-dom";

>>>>>>> 5d860a90aa8727050754d73bb9e57ca8880d491f
import './style.css';

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
<<<<<<< HEAD

=======
>>>>>>> 5d860a90aa8727050754d73bb9e57ca8880d491f
            <TotalWorkTime />
            <div className="test-vacation-time">
                Available vacation time 3.00 days
            </div>

            <Link to="/VacationRequest">
                <button className="request-vacation-button">Request vacation</button>
            </Link>

        </div>
    );
    return (
        <React.Fragment>
            
        </React.Fragment>
    );
}

export default Profile;