import Cookies from 'js-cookie';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/configureStore';
import { actionCreators } from '../store/Timer/actions';
import { TimerType } from '../store/Timer/types';
import '../style/RequestsTable.css';
import { deleteTimer, getUserTimerData } from '../webAPI/timer';

type TableProps = {
    requests: Array<TimerType>
}

class Popup extends React.Component {
    render() {
        const popup = {
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            zIndex: 2,
            backgroundColor: "rgba(0, 0, 0, 0.5)"
    };
    const popup_inner = {
        position: "absolute",
        left: "25%",
        right: "25%",
        top: "25%",
        bottom: "25%",
        margin: "auto",
        backgroundColor: "white"
    };
        return (
            <div style = { popup } >
                <div style={popup_inner}>
                    <h1>{this.props.text}</h1>
                    <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
        );
    }
}

class TimerHistoryTable extends Component {
    constructor() {
        super();
        this.state = {
            showPopup: false
        };
    }
    async componentDidMount() {
        const token = Cookies.get('token');
        if (token) {
            const data = await getUserTimerData(token);
        }
        console.log(this.props.timerHistory);
    }
    async deleteTimerValue(id: number){
        const token = Cookies.get('token');
        const data = await deleteTimer(token, id);

        if (data.data) {
            this.props.deleteTime(data.data.deleteTimerFinishValue.id);
        }
    }
    convertMiliseconds(finishTime, startTime) {
        if (finishTime == null) {
            return ""
        }
        var millis = new Date(finishTime) - new Date(startTime);
        var minutes;
        var hours;
        minutes = Math.floor((millis / (1000 * 60)) % 60);
        hours = Math.floor((millis / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;

        return hours + ":" + minutes ;
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    render() {
        if (this.props.timerHistory != undefined && this.props.timerHistory.length > 0) {
            console.log('table' + this.props.timerHistory[0].id);
            return (
                <React.Fragment>
                    <div id='vacation-history'>
                        <h5>Vacation history</h5>
                        <table id='history'>
                            <tbody>
                                <tr>
                                    <th>Interval</th>
                                    <th>Time(h:m)</th>
                                    <th></th>
                                </tr>
                                {this.props.timerHistory.map((r) => <tr key={this.props.timerHistory.indexOf(r)}>
                                    <td>{(new Date(r.startTime)).toLocaleTimeString()}-{(r.finishTime == null ? "still in action" : (new Date(r.finishTime)).toLocaleTimeString())}</td>
                                    <td>{
                                        this.convertMiliseconds(r.finishTime,r.startTime)
                                    }</td>
                                    <td>
                                        <button onClick={() => {
                                            this.togglePopup()
                                        }}>Edit</button>
                                        <button onClick={() => {
                                        this.deleteTimerValue(r.id)
                                    }}>Delete</button>
                                    </td>

                                </tr>)}
                                {this.state.showPopup ?
                                    <Popup
                                        text='Close Me'
                                        closePopup={this.togglePopup.bind(this)}
                                    />
                                    : null
                                }
                            </tbody>
                            <button id='send-request'>Add new item</button>

                        </table>
                    </div>
                </React.Fragment>)
        }
        else {
            return (
                <React.Fragment>
                    <div id='vacation-history'>
                        <h5>Timer history</h5>
                        <table id='history'>
                            <tbody>
                                <tr>
                                    <th>Interval</th>
                                    <th>Time</th>
                                    <th></th>
                                </tr>
                                <button id='send-request'>Add new item</button>
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>)
        }
    }
}
export default connect(
    (state: ApplicationState) => state.timerHistory,
    actionCreators
)(TimerHistoryTable);


