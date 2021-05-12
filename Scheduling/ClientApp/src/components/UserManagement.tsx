import * as React from 'react';
import Cookies from 'js-cookie';
import { connect, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
import { UserManagementState } from '../store/UserManagement/types';
import { actionCreators } from '../store/UserManagement/actions';
import { useEffect } from 'react';
import '../style/RequestsTableAndUsersTable.css';
import '../style/DeleteBoxUserManagement.css';


type UserManagementProps =
    UserManagementState &
    typeof actionCreators &
    RouteComponentProps<{}>;

export const UserManagement: React.FC<UserManagementProps> = (props) => {
    const [isDeleteBoxOpen, setIsDeleteBoxOpen] = useState(false);
    const [userId, setUserId] = useState(0);

    const dispatch = useDispatch();

    const requestUsersCallback = () => dispatch({ type: 'REQUESTED_USERS' });
    useEffect(() => {
        requestUsersCallback();
    }, []);
    console.log(props.users);
    return (
        <React.Fragment>
            <DeleteBox id={userId} isOpen={isDeleteBoxOpen} setIsOpen={setIsDeleteBoxOpen} />
            <div id='usersTableBorder'>
                <button className="createNewUserButton">Create new user</button>
                <h1>User managment</h1>
                <table id='users'>
                    <tbody>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Team</th>
                            <th>Permissions</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {props.users.map((u, index) => {
                            if (u != null) {
                                    
                                    return(<tr key={props.users.indexOf(u)}>
                                        <td>{u.name}</td>
                                        <td>{u.surname}</td>
                                        <td>{u.email}</td>
                                        <td>{u.position}</td>
                                        <td>{u.team.name}</td>
                                        <td>{u.userPermissions.map((up) => {
                                            return(
                                            <div key={u.userPermissions.indexOf(up)}>{up.permission.permissionName}</div>)})}
                                        </td>
                                        <td>
                                            <button>Edit</button>
                                        </td>
                                        <td>
                                            <button
                                                className="deleteUserButton"
                                                onClick={() => { setIsDeleteBoxOpen(true); setUserId(index); }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>);
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};



type DeleteBoxProps = {
    id: number,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const DeleteBox: React.FC<DeleteBoxProps> = ({ id, isOpen, setIsOpen }) => {
    let content = isOpen ?
        <div className="shadowBox">
            <div className="deleteBox">
                <p>Are you sure you want to delete this user ?</p>
                <div>
                    <button onClick={() => { handleDeleteUser(); setIsOpen(false); }}>Delete</button>
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
        : null;

    function handleDeleteUser() {

    }

    return(
        <React.Fragment>
            {content}
        </React.Fragment>
    );
};


export default connect(
    (state: ApplicationState) => state.userManagement,
    actionCreators
)(UserManagement);