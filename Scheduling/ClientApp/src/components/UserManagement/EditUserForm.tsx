import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { ApplicationState } from '../../store/configureStore';
import { UserDataSend, UserManagementState } from '../../store/UserManagement/types';
import { actionCreators } from '../../store/UserManagement/actions';
import { useState } from 'react';
import '../../style/RequestsTableAndUsersTable.css';
import { Link } from 'react-router-dom';
import { UserData } from '../../store/User/types';


type UserManagementProps =
    UserManagementState &
    typeof actionCreators &
    RouteComponentProps<{}>;

export const EditUserForm: React.FC<UserManagementProps> = (props) => {
    const [name, setName] = useState(props.userEdit.onEditingUser!.name);
    const [surname, setSurname] = useState(props.userEdit.onEditingUser!.surname);
    const [email, setEmail] = useState(props.userEdit.onEditingUser!.email);
    //const [password, setPassword] = useState(props.onEditingUser!.password);
    const [position, setPosition] = useState(props.userEdit.onEditingUser!.position);


    const dispatch = useDispatch();
    const history = useHistory();

    function handleSubmit() {

        if (name !== "" && surname !== "" && /^\w+@\w+\.\w+$/.test(email) && position !== "") {
            props.requestedEditUser(
                {
                    id: props.userEdit.onEditingUser!.id,
                    email,
                    name,
                    surname,
                    position,
                    department: props.userEdit.onEditingUser!.department,
                    permissionIds: props.userEdit.onEditingUser!.computedProps.userPermissions.map(it => it.permission.id),
                    teamId: props.userEdit.onEditingUser!.computedProps.team.id
                } as UserDataSend

                // {
                //     id: props.userEdit.onEditingUser!.id,
                //     email,
                //     name,
                //     surname,
                //     position,
                //     department: props.userEdit.onEditingUser!.department,
                //     team: props.userEdit.onEditingUser!.team,
                //     userPermissions: props.userEdit.onEditingUser!.userPermissions,
                // } as UserData


                // department: props.onEditingUser!.department,
                // team: props.onEditingUser!.team,
                // userPermissions: props.onEditingUser!.userPermissions,
            )
            //history.push('/usermanagement');
        }
    }

    let message = props.userEdit.message.editedSuccessfuly ?
        <div className="alert alert-success alert-dismissible fade show position-absolute top-0 end-0 w-50" role="alert">
            {props.userEdit.message.text + ' '}
            <a onClick={() => history.push('/usermanagement')} className="alert-link">Check all the users.</a>
        </div>
        : undefined

    return (
        <React.Fragment>
            {message}
            <div className='border'>
                <h1>Edit User</h1>

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
                    </tbody>
                </table>
                <div className="border">
                    <h3>Attributes</h3>
                </div>
                <button onClick={handleSubmit} id="createButton">Edit User</button>
                <Link to="/usermanagement" id="cancelButton">Cancel</Link>

            </div>
        </React.Fragment>
    );
};

export default connect(
    (state: ApplicationState) => state.userManagement,
    actionCreators
)(EditUserForm);
