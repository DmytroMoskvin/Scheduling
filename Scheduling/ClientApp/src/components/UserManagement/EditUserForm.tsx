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
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [position, setPosition] = useState("");


    const dispatch = useDispatch();
    const history = useHistory();

    function handleSubmit() {
        if (name !== "" && surname !== "" && /^\w+@\w+\.\w+$/.test(email) && password !== "" && position !== "") {
            
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
                                <td><input onChange={(e) => setName(e.target.value)} required /></td>
                                <th><h4>Surname</h4></th>
                                <td><input onChange={(e) => setSurname(e.target.value)} required /></td>
                            </tr>
                            <tr>
                                <th><h4>Email</h4></th>
                                <td><input onChange={(e) => setEmail(e.target.value)} required /></td>
                                <th><h4>Position</h4></th>
                                <td><input onChange={(e) => setPosition(e.target.value)} required /></td>
                            </tr>
                            <tr>
                                <th><h4>Password</h4></th>
                                <td><input onChange={(e) => setPassword(e.target.value)} required /></td>
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
