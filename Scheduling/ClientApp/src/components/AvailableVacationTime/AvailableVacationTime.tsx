import * as React from 'react';
import {Link} from "react-router-dom";

import {getAvailableVacationDays, getUsersOnVacationWithinTeamByDate} from "../../webAPI/user";

import './style.css';

type AvailableVacationTimeProps = {
    token: string;
}

class AvailableVacationTime extends React.PureComponent<AvailableVacationTimeProps, {availableVacationTime: number}> {
    constructor(props: AvailableVacationTimeProps) {
        super(props);
        this.state = {availableVacationTime: 1}
    }

    isVacationAvailable() {
        return this.state.availableVacationTime > 0;
    }

    async componentDidMount() {
        await getAvailableVacationDays(this.props.token)
            .then(({data}) => {
                this.setState({availableVacationTime: data.getAvailableVacationDays});
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="available-vacation-time">

                <p>Available vacation time: {this.state.availableVacationTime} day</p>

                <Link to="/VacationRequest">
                    <button className={"request-vacation-button" + (this.isVacationAvailable() ? "" : " inactive")}
                            disabled={!this.isVacationAvailable()}>
                        Request vacation
                    </button>
                </Link>

            </div>
        );
    }
}

export default AvailableVacationTime;