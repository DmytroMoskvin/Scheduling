import * as React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
import { TimerHistoryState } from '../store/Timer/types';
import '../style/VacationRequest.css';
import { actionCreators } from '../store/Timer/actions';
import { useState } from 'react';
import  TimerHistoryTable  from './TimerHistoryTable';
import Timer from "./timer"
import Cookies from 'js-cookie';
import { getUserTimerData, getUserTimerDataDate } from '../webAPI/timer';
type TimerHistoryProps =
    TimerHistoryState &
    typeof actionCreators &
    RouteComponentProps<{}>;


class DatePanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            startDate: new Date()
            startDate: new Date()
        };

    };
    async componentDidMount() {
        const token = Cookies.get('token');
        if (token) {
            const data = await getUserTimerDataDate(token, this.getConvertedDate(new Date()));

            let currentDate = data.data.getCurrentUser.computedProps.timerHistories;

            this.props.setTimerHistory(currentDate);
        }
    }
    async changeDate(date) {
        const token = Cookies.get('token');
        if (token) {
            const data = await getUserTimerDataDate(token, this.getConvertedDate(date));

            let currentDate = data.data.getCurrentUser.computedProps.timerHistories;

            this.props.setTimerHistory(currentDate);
        }
    }
    getConvertedDate(date: Date) {
        var today = date;
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return (today);
    }
    public render(){
    return (
        <DatePicker
            selected={this.state.startDate}
            onChange={date => {
                this.changeDate(date);
            }}
            filterDate={(date) => {
                return new Date() > date;
            }}

            inline
        />
        );
    }
}


export default connect(
    (state: ApplicationState) => state.timerHistory,
    actionCreators
)(DatePanel);