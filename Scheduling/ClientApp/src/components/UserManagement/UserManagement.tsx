import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store/configureStore';
import { UserManagementState } from '../../store/UserManagement/types';
import { actionCreators } from '../../store/UserManagement/actions';
import { useEffect } from 'react';
import '../../style/RequestsTableAndUsersTable.css';
import '../../style/DeleteBoxUserManagement.css';
import { Link } from 'react-router-dom';


type UserManagementProps =
    UserManagementState &
    typeof actionCreators &
    RouteComponentProps<{}>;

export const UserManagement: React.FC<UserManagementProps> = (props) => {
    const [isDeleteBoxOpen, setIsDeleteBoxOpen] = useState(false);
    const [userId, setUserId] = useState(-1);

    const dispatch = useDispatch();

    const requestUsers = () => dispatch({ type: 'REQUESTED_USERS' });
    useEffect(() => {
        requestUsers();
    }, []);

    const permissions = new Map<string, string>([
        ["USER_MANAGEMENT", "User Management"],
        ["VACATION_APPROVALS", "Vacation Approvals"],
        ["TIME_TRACKING", "Time Tracking"],
        ["ACCOUNTANT", "Accountant"]
    ]);

    return (
        <React.Fragment>
            <DeleteBox
                id={userId} isOpen={isDeleteBoxOpen}
                setIsOpen={setIsDeleteBoxOpen}
            />
            <div id='usersTableBorder'>
                <Link to="/createuser" className="createNewUserButton">Create new user</Link>
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
                        {props.users.map((u) => {
                            if (u != null) {
                                if (u.computedProps.team == null || u.computedProps.team.name == null) u.computedProps.team = { id: 0, name: "No Team" };
                                    return(<tr key={props.users.indexOf(u)}>
                                        <td>{u.name}</td>
                                        <td>{u.surname}</td>
                                        <td>{u.email}</td>
                                        <td>{u.position}</td>
                                        <td>{u.computedProps.team.name}</td>
                                        <td>{u.computedProps.userPermissions.map((up) => {
                                            let name = up.permission.name.toLowerCase();
                                            name = name.replace(/_/g, " ");
                                            return (
                                                <div key={u.computedProps.userPermissions.indexOf(up)}>{name}</div>)
                                        })}
                                        </td>
                                        <td>
                                            <Link to="/edituser" onClick={() => props.setEditUser(props.users.indexOf(u))} className="editUserButton">Edit</Link>
                                        </td>
                                        <td>
                                            <button
                                                className="deleteUserButton"
                                                onClick={() => { setIsDeleteBoxOpen(true); setUserId(u.id); }}>
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
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const DeleteBox: React.FC<DeleteBoxProps> = ({ id, isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const requestRemoveUser = () => dispatch({ type: 'REQUESTED_DELETE_USER', payload: id });
    const handleRemoveUser = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        requestRemoveUser();
        setIsOpen(false);
    }

    let content = isOpen ?
        <div className="shadowBox">
            <div className="deleteBox">
                <p>Are you sure you want to delete this user ?</p>
                <div>
                    <button
                        className="deleteUserButton"
                        onClick={handleRemoveUser}
                    >
                        Delete
                    </button>
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
        : null;

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