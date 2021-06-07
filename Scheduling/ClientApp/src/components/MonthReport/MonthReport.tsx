import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store/configureStore';
import { UserState } from '../../store/User/types';
import './../../style/MonthReport/MonthReport.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { getUsersData } from './../../webAPI/user';




type MonthReportProps =
    UserState &
    RouteComponentProps<{}>;

type TimerHistories = {
    id: number,
    startTime: Date,
    finishTime: Date
}

type User = {
    name: string,
    surname: string,
}


    

class MonthReport extends React.PureComponent<MonthReportProps, { loading: boolean, users: Array<User>, filteredUsers: Array<User>, selectedDate: Date | Date[]}> {
    public state = {
        users: new Array<User>(),
        filteredUsers: new Array<User>(),
        loading: false,
        selectedDate: new Date
    }

    handeCalendar = (date: Date | Date[] ) => {
        this.setState({ selectedDate: date });
    }

    handleEmployeeSelect(employeeName: string) {
        if (employeeName !== 'all')
            this.setState({ filteredUsers: this.state.users.filter((user) => user.name === employeeName) });
        else
            this.setState({ filteredUsers: this.state.users });
    }

    componentDidMount() {
        this.considerRequest();
    }

    async considerRequest() {
        let userData;
        if (this.props.token !== null)
            userData = await getUsersData(this.props.token);
        if (userData !== null) {
            this.setState({ users: userData.data.getAllUsers });
            this.setState({ filteredUsers: userData.data.getAllUsers });
        }
    }


    public render() {
        if (this.props.logged && this.props.token && this.props.user && this.props.user.computedProps.permissions.includes('Manager'))
            return (
                <React.Fragment>
                    <main>
                        <div id='mouth-selector'>
                            Employee select:
                            <select onChange={(value) => this.handleEmployeeSelect(value.target.value)}>
                                <option value={'all'}>all</option>
                                {this.state.users.map((user) =>
                                    <option value={user.name}>{user.name}</option>
                                    )
                                }
                            </select>
                            <Calendar className={"calendar"} onChange={(value) => { this.handeCalendar(value);}}/>
                        </div>
                        <div id='reports-container'>

                            <ReactHTMLTableToExcel
                                id="mounth-report-to-XLS"
                                className="download-table-xls-button"
                                table="mounth-report-table"
                                filename="Month report"
                                sheet="Month report"
                                buttonText="EXPORT" />


                            <table id="mounth-report-table">
                                <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Total work time</th>
                                    <th>Planned time</th>
                                    <th>Vacation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filteredUsers.map((user) =>
                                        <tr>
                                            <td>{user.name} {user.surname}</td>
                                            <td>{ }</td>
                                            <td>{}</td>
                                            <td>{}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </main>
                </React.Fragment>
            );
        else
            return <Redirect to='/' />
    }
}
export default connect(
    (state: ApplicationState) => state.loggedUser
)(MonthReport);