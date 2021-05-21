import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { ApplicationState } from '../../store/configureStore';
import { UserManagementState } from '../../store/UserManagement/types';
import { actionCreators } from '../../store/UserManagement/actions';
import { useState, useEffect } from 'react';
import '../../style/RequestsTableAndUsersTable.css';
import '../../style/DeleteBoxUserManagement.css';
import '../../style/CreateUserForm.css';
import { Link } from 'react-router-dom';
import { UserPermission, UserState } from '../../store/User/types';
import { delay } from 'redux-saga/effects';


type UserManagementProps =
    UserManagementState &
    typeof actionCreators &
    RouteComponentProps<{}>;

export const CreateUserForm: React.FC<UserManagementProps> = (props) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [department, setDepartment] = useState("");
    const [teamId, setTeamId] = useState(0);
    const [userManagementPermission, setUserManagementPermission] = useState(false);
    const [vacationApprovalsPermission, setVacationApprovalsPermission] = useState(false);
    const [timeTrackingPermission, setTimeTrackingPermission] = useState(false);
    const [accountantPermission, setAccountantPermission] = useState(false);
    let permissionsArray: UserPermission[] = [];

    const history = useHistory();

    const dispatch = useDispatch();
    const requestCreateUser = () => dispatch({
        type: 'REQUESTED_CREATE_USER', payload: {
            name: name,
            surname: surname,
            email: email,
            password: "",
            position: position,
            department: department,
            userPermissions: permissionsArray,
            team: { id: teamId, name: "" }
        }
    });

    const requestTeams = () => dispatch({ type: 'REQUESTED_TEAMS' });
    useEffect(() => {
        requestTeams();
        console.log(props.teams);
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (name !== "" && surname !== "" && /^\w+@\w+\.\w+$/.test(email) && department !== "" && position !== "") {
            if (userManagementPermission)
                    permissionsArray.push({ permission: { name: "USER_MANAGEMENT" } });
            if (vacationApprovalsPermission)
                    permissionsArray.push({ permission: { name: "VACATION_APPROVALS" } });
            if (timeTrackingPermission)
                    permissionsArray.push({ permission: { name: "TIME_TRACKING" } });
            if (accountantPermission)
                    permissionsArray.push({ permission: { name: "ACCOUNTANT" } });

            requestCreateUser();
            history.push('/usermanagement');
        }
    }

    return (
        <React.Fragment>
            <div className='border'>
                <h1>Create new user</h1>
                <form>
                    <table id="fieldsTable">
                        <tbody>
                            <tr>
                                <th><h4>Name</h4></th>
                                <td><input onChange={(e) => setName(e.target.value)} required /></td>
                                <th><h4>Surname</h4></th>
                                <td><input onChange={(e) => setSurname(e.target.value)} required /></td>
                            </tr>
                            <tr>
                                <th><h4>Position</h4></th>
                                <td><input onChange={(e) => setPosition(e.target.value)} required /></td>
                                <th><h4>Department</h4></th>
                                <td><input onChange={(e) => setDepartment(e.target.value)} required /></td>
                            </tr>
                            <tr>
                                <th><h4>Email</h4></th>
                                <td><input onChange={(e) => setEmail(e.target.value)} pattern="^\w+@\w+\.\w+$" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="border">
                        <table id="attributesTable">
                            <tbody>
                                <tr>
                                    <td rowSpan={2}>
                                        <h3>Attributes</h3>
                                    </td>
                                    <td><h6>Teams</h6></td>
                                    <td><h6>Permissions</h6></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table className="borderInnerTable">
                                            <tbody>
                                                {props.teams.map((t, index) => {
                                                    if (t != null) {
                                                        return (<tr key={index}>
                                                            <td>
                                                                <input type="radio" name="team" checked={teamId === t.id} onChange={() => setTeamId(t.id)} />
                                                            </td>
                                                            <td>{t.name}</td>
                                                        </tr>);
                                                    }
                                                })}
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>
                                        <table className="borderInnerTable">
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" value="USER_MANAGEMENT" onChange={(e) => setUserManagementPermission(e.target.checked)} /></td>User Management<td></td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" value="VACATION_APPROVALS" onChange={(e) => setVacationApprovalsPermission(e.target.checked)} /></td><td>Vacation Approvals</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" value="TIME_TRACKING" onChange={(e) => setTimeTrackingPermission(e.target.checked)} /></td><td>Time Tracking</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" value="ACCOUNTANT" onChange={(e) => setAccountantPermission(e.target.checked)} /></td><td>Accountant</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button onClick={handleSubmit} id="createButton">Create New User</button>
                    <Link to="/usermanagement" id="cancelButton">Cancel</Link>
                </form>
            </div>
        </React.Fragment>
    );
};

export default connect(
    (state: ApplicationState) => state.userManagement,
    actionCreators
)(CreateUserForm);
