import * as React from 'react';
import {Link} from "react-router-dom";

import './style.css';

type UserListProps = {
    users: string[]
}

const UserList: React.FunctionComponent<UserListProps> = (props: UserListProps) => {
    console.log(props);

    return (
        <div className="user-list">
            {props.users.map((u) => {
                return <div className="user-list-element">{u}</div>
            })}
        </div>
    );
}

export default UserList;