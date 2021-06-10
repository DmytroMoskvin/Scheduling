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
import { Permission, UserPermission } from '../../store/User/types';
import { UserData } from '../../store/User/types';

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
    const [userPermissions, setUserPermissions] = useState([] as UserPermission[]);
    let permissionsArray: UserPermission[] = [];

    const history = useHistory();

    const dispatch = useDispatch();
    const requestCreateUser = () =>
        props.requestedCreateUser({
            id: -1,
            name: name,
            surname: surname,
            email: email,
            password: "",
            position: position,
            department: department,
            computedProps: {
                userTeam: {
                    team: { id: teamId, name: "" },
                },
                userPermissions: userPermissions
            }
        } as UserData);
    // dispatch({
    //     type: 'REQUESTED_CREATE_USER', payload: {
    //         name: name,
    //         surname: surname,
    //         email: email,
    //         password: "",
    //         position: position,
    //         department: department,
    //         userPermissions: userPermissions,
    //         team: { id: teamId, name: "" },
    //     }
    // }
    //);

const requestTeams = () => dispatch({ type: 'REQUESTED_TEAMS' });
const requestPermissions = () => dispatch({ type: 'REQUESTED_PERMISSIONS' });
useEffect(() => {
    requestTeams();
    requestPermissions();
}, []);

const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (name !== "" && surname !== "" && /^\w+@\w+\.\w+$/.test(email) && department !== "" && position !== "") {
        /*for (let i = 0; i < props.permissions.length; i++) {
            if(props.permissions[i].id)
            permissionsArray.push({ permission: props.permissions[i] });
        }*/
        requestCreateUser();
        //history.push('/usermanagement');
    }
}

function handlePermissionCheckboxChange(id: number) {
    let permission = props.permissions.find(p => p.id == id);

    if (permission != undefined)
        userPermissions.push({ permission: permission })
    else
        setUserPermissions(
            userPermissions.filter(p => p.permission.id != id)
        );
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
                                                            <input type="radio" name="team"
                                                                checked={teamId === t.id}
                                                                onChange={() => setTeamId(t.id)}
                                                            />
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
                                            {props.permissions.map((t, index) => {
                                                let name = t.name.toLowerCase();
                                                name = name.replace(/_/g, " ");
                                                if (t != null) {
                                                    return (<tr key={index}>
                                                        <td>
                                                            <input
                                                                type="checkbox" value={t.name}
                                                                onChange={() => handlePermissionCheckboxChange(t.id)}
                                                            />
                                                        </td>
                                                        <td>{name}</td>
                                                    </tr>);
                                                }
                                            })}
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
