import * as React from 'react';
import {Link} from "react-router-dom";

import UserList from "../UserList";

import {getUsersOnVacationWithinTeamByDate} from "../../webAPI/user";

import './style.css';

type WhoIsOutProps = {
    token: string
}

class WhoIsOut extends React.PureComponent<WhoIsOutProps, {usersOnVacationToday: string[], usersOnVacationTomorrow: string[]}> {
    constructor(props: WhoIsOutProps) {
        super(props);
        this.state = {usersOnVacationToday: new Array<string>(), usersOnVacationTomorrow: new Array<string>()}
    }

    async componentDidMount() {
        await getUsersOnVacationWithinTeamByDate(this.props.token, new Date())
            .then(({data}) => {
                this.setState({usersOnVacationToday: data.getUsersOnVacation.map((user: { name: string; }) => user.name)});
            })
            .catch(err => console.error(err))

        await getUsersOnVacationWithinTeamByDate(this.props.token, new Date(new Date().setDate(new Date().getDate() + 1)))
            .then(({data}) => {
                this.setState({usersOnVacationTomorrow: data.getUsersOnVacation.map((user: { name: string; }) => user.name)});
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="who-is-out">
                <h2>Who is out</h2>

                <p>Today</p>
                <UserList users={this.state.usersOnVacationToday}/>

                <p>Tomorrow</p>
                <UserList users={this.state.usersOnVacationTomorrow}/>

                <Link to="/calendar">
                    <button className="view-team-calendar-button">View team calendar</button>
                </Link>

            </div>
        );
    }
}

export default WhoIsOut;