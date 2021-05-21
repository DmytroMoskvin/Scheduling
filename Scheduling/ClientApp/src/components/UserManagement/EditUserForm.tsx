import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { ApplicationState } from '../../store/configureStore';
import { UserManagementState } from '../../store/UserManagement/types';
import { actionCreators } from '../../store/UserManagement/actions';
import { useState } from 'react';
import '../../style/RequestsTableAndUsersTable.css';
import { Link } from 'react-router-dom';


type UserManagementProps =
    UserManagementState &
    typeof actionCreators &
    RouteComponentProps<{}>;

export const EditUserForm: React.FC<UserManagementProps> = (props) => {
    const [name, setName] = useState(props.onEditingUser!.name);
    const [surname, setSurname] = useState(props.onEditingUser!.surname);
    const [email, setEmail] = useState(props.onEditingUser!.email);
    //const [password, setPassword] = useState(props.onEditingUser!.password);
    const [position, setPosition] = useState(props.onEditingUser!.position);


    const dispatch = useDispatch();
    const history = useHistory();

    function handleSubmit() {
        if (name !== "" && surname !== "" && /^\w+@\w+\.\w+$/.test(email) && position !== "") {
            props.requestedEditUser(
                props.onEditingUser!.id,
                email,
                name,
                surname,
                position,
                // department: props.onEditingUser!.department,
                // id: props.onEditingUser!.id,
                // team: props.onEditingUser!.team,
                // userPermissions: props.onEditingUser!.userPermissions,
            )
            history.push('/usermanagement');
        }
    }

    return (
        <React.Fragment>
            <div className='border'>
                <h1>Edit User</h1>
                <form>
                    <table id="fieldsTable">
                        <tbody>
                            <tr>
                                <th><h4>Name</h4></th>
                                <td><input onChange={(e) => setName(e.target.value)} required value={name} /></td>
                                <th><h4>Surname</h4></th>
                                <td><input onChange={(e) => setSurname(e.target.value)} required value={surname} /></td>
                            </tr>
                            <tr>
                                <th><h4>Email</h4></th>
                                <td><input onChange={(e) => setEmail(e.target.value)} required value={email} /></td>
                                <th><h4>Position</h4></th>
                                <td><input onChange={(e) => setPosition(e.target.value)} required value={position} /></td>
                            </tr>
                            <tr>
                                <th><h4>Password</h4></th>
                                <td><input   /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="border">
                        <h3>Attributes</h3>
                    </div>
                    <button onClick={() => handleSubmit()} id="createButton">Edit User</button>
                    <Link to="/usermanagement" id="cancelButton">Cancel</Link>
                </form>
            </div>
        </React.Fragment>
    );
};

export default connect(
    (state: ApplicationState) => state.userManagement,
    actionCreators
)(EditUserForm);
