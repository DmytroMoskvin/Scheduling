import Cookies from 'js-cookie';
import { Data } from 'popper.js';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/configureStore';
import { actionCreators } from '../../store/Timer/actions';
import { TimerType } from '../../store/Timer/types';
import '../../style/RequestsTable.css';
import { deleteTimer, addTimerValue, getUserTimerData, getUserTimerDataDate, editTimerValue } from '../../webAPI/timer';

type TableProps = {
}

interface IProps {
    timerHistory: Array<TimerType>;
    buttonText: string;
    finishTime: Date;
    startTime: Date;
    editId: number;
    date: Date;
    deleteTime: (time: number) =>
        ({
            type: "DELETE_TIME",
            time: number
        });
    setTimerHistory: (requests: Array<TimerType>) =>
        ({
            type: "SET_TIMERHISTORY",
            requests: Array<TimerType>
        });
    closePopup: (idArg?: string, startTime?: Date, finishTime?: Date) => void;
}

interface IState {
    startTime: Date;
    finishTime: Date;
    showWarning: boolean;
}

class Popup extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            startTime: new Date(new Date().setHours(0, 0, 0, 0)),
            finishTime: new Date(new Date().setHours(0, 0, 0, 0)),
            showWarning: false,
        };
        this.convertDateToHoursMinutesStart = this.convertDateToHoursMinutesStart.bind(this);

    }
    componentDidMount() {
        if (this.props.buttonText == "Edit") {
            this.setFinishTime(new Date(this.props.finishTime));
            this.setStartTime(new Date(this.props.startTime));
        }
        if (this.props.startTime > this.props.finishTime) {
            this.setState({
                showWarning: true,
            });
        }
        else {
            this.setState({
                showWarning: false,
            });
        }
    }
    async deleteTimerValue(id: number) {
        const token = Cookies.get('token');
        let data;
        if(token != null)
            data = await deleteTimer(token, id);

        if (data.data) {
            this.props.deleteTime(data.data.deleteTimerFinishValue.id);
        }
    }
    handleChangeStartTime = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        var a;
        if (this.state.startTime != null) {
            a = new Date(this.state.startTime);
            a.setHours(Number(target.value.split(":")[0]))
            a.setMinutes(Number(target.value.split(":")[1]));
            a.setSeconds(0);
            this.setStartTime(a);
        }
    };
    handleChangeFinishTime = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        var a;
        if (this.state.finishTime != null) {
            a = new Date(this.state.finishTime);
            a.setHours(Number(target.value.split(":")[0]));
            a.setMinutes(Number(target.value.split(":")[1]));
            a.setSeconds(0);
            this.setFinishTime(a);
        }
    };
    setStartTime(time: Date) {
        if (this.state.finishTime != null) {
            if (time < this.state.finishTime)
                this.setState({
                    startTime: time,
                    showWarning: false,
                });
            else {
                this.setState({
                    showWarning: true,
                    startTime: time,
                });
                console.log("loh")
            }
        }
    }
    setFinishTime(time: Date) {
        if (this.state.startTime != null) {
            if (time > this.state.startTime)
                this.setState({
                    finishTime: time,
                    showWarning: false,
                });
            else {
                this.setState({
                    showWarning: true,
                    finishTime: time,
                });
                console.log("loh")
            }
        }
    }
    convertDateToHoursMinutesStart(time: Date) {
        let hours = new Date(time).getHours();
        let hoursStr = (hours < 10) ? "0" + hours : hours;
        let minutes = new Date(time).getMinutes();
        let minutesStr = (minutes < 10) ? "0" + minutes : minutes;
        return (hoursStr + ":" + minutesStr);
    }
    async addValue(startTimeArg: Date, finishTimeArg: Date) {
        if (finishTimeArg > startTimeArg) {
            var startTime = new Date(this.props.date); // from store

            console.log(this.props.date);

            console.log(this.props);

            startTime.setHours(startTimeArg.getHours());
            startTime.setMinutes(startTimeArg.getMinutes());
            var finishTime = new Date(this.props.date); // from store
            finishTime.setHours(finishTimeArg.getHours());
            finishTime.setMinutes(finishTimeArg.getMinutes());


            const token = Cookies.get('token');
            if (token) {
                const data = await addTimerValue(token, startTime.toISOString(), finishTime.toISOString());
            }

            this.changeDate(this.props.date);
        }
        else {
            console.log("loh")
        }
    }
    async editValue(startTimeArg: Date, finishTimeArg: Date, id: number) {
        if (finishTimeArg > startTimeArg) {
            var startTime = new Date(this.props.timerHistory[this.props.timerHistory.length - 1].startTime); // from store
            startTime.setHours(startTimeArg.getHours());
            startTime.setMinutes(startTimeArg.getMinutes());
            var finishTime = new Date(this.props.timerHistory[this.props.timerHistory.length - 1].finishTime); // from store
            finishTime.setHours(finishTimeArg.getHours());
            finishTime.setMinutes(finishTimeArg.getMinutes());


            const token = Cookies.get('token');
            if (token) {
                const data = await editTimerValue(token, startTime.toISOString(), finishTime.toISOString(), id);
            }

            this.changeDate(this.props.date);
        }
        else {
            console.log("loh")
        }
    }
    getConvertedDate(date: Date) {
        var today = date;
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        let todayStr = yyyy + '-' + mm + '-' + dd;
        return (todayStr);
    }

    async changeDate(date: Date) { // додати два дні
        const token = Cookies.get('token');
        if (token) {
            var dayBefore = (new Date(date.getTime()));
            dayBefore.setDate(date.getDate() - 1);

            let data = await getUserTimerDataDate(token, this.getConvertedDate(date));
            console.log(this.getConvertedDate(date))
            let dataDayBefore = await getUserTimerDataDate(token, this.getConvertedDate(dayBefore));
            console.log(this.getConvertedDate(dayBefore));

            data.data.getCurrentUser.computedProps.timerHistories = data.data.getCurrentUser.computedProps.timerHistories.concat(
                dataDayBefore.data.getCurrentUser.computedProps.timerHistories)

            data.data.getCurrentUser.computedProps.timerHistories =
                data.data.getCurrentUser.computedProps.timerHistories
                    .filter((time: { startTime: string }) => ((new Date(new Date(time.startTime) + " UTC").toLocaleDateString())) == date.toLocaleDateString());

            console.log(data);

            let currentDate = data.data.getCurrentUser.computedProps.timerHistories
                .sort((a: { startTime: Date; }, b: { startTime: Date; }) => new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf());

            this.props.setTimerHistory(currentDate);
        }
    }
    render() {
        const closeButton: React.CSSProperties = {
            top: "0px",
            right: "0px",
            position: "absolute",
        };
        const popup: React.CSSProperties = {
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

        const popup_inner: React.CSSProperties = {
            position: "absolute",
            left: "40%",
            right: "40%",
            top: "40%",
            bottom: "40%",
            margin: "auto",
            backgroundColor: "white",
            padding: "2vw"
            };
        const timeInput = {
            margin: "5px",
        };
        if (this.props.buttonText == "Edit")
        return (
            <div style={popup} onClick={proxy => proxy.stopPropagation() } >
                <div style={popup_inner}>
                    <h6>{this.props.buttonText}</h6>
                    <input type="time" value={this.convertDateToHoursMinutesStart(this.state.startTime)} onChange={this.handleChangeStartTime} style={timeInput} />
                    -
                    <input type="time" value={this.convertDateToHoursMinutesStart(this.state.finishTime)} style={timeInput} onChange={this.handleChangeFinishTime} />

                    {this.state.showWarning ?
                        <button disabled>{this.props.buttonText}</button>
                        :
                        <button onClick={(e) => { this.editValue(this.state.startTime, this.state.finishTime, this.props.editId); this.props.closePopup() }}>{this.props.buttonText}</button>
                    }

                    <button onClick={(e) => { this.props.closePopup() }}  style={closeButton}>Close</button>
                    <button onClick={() => {
                        this.deleteTimerValue(this.props.editId)
                    }}>Delete</button>
                    {this.state.showWarning ?
                        <h6>finish time must be greater than start time</h6>
                        : null
                    }
                </div>
            </div>
            );
        else
            return (
                <div style={popup} onClick={proxy => proxy.stopPropagation()} >
                    <div style={popup_inner}>
                        <h6>{this.props.buttonText}</h6>
                    <input type="time" value={this.convertDateToHoursMinutesStart(this.state.startTime)} onChange={this.handleChangeStartTime} style={timeInput} />
                    -
                    <input type="time" min={this.convertDateToHoursMinutesStart(this.state.startTime)} value={this.convertDateToHoursMinutesStart(this.state.finishTime)} style={timeInput} onChange={this.handleChangeFinishTime} />
                        {this.state.showWarning ?
                            <button disabled>{this.props.buttonText}</button>
                            :
                            <button onClick={(e) => { this.addValue(this.state.startTime, this.state.finishTime); this.props.closePopup() }}>{this.props.buttonText}</button>
                        }
                        <button onClick={(e) => { this.props.closePopup() }} style={closeButton}>Close</button>
                        {this.state.showWarning ?
                            <h6>finish time must be greater than start time</h6>
                            : null
                        }
                    </div>
                </div>
            );
    }
}


export default connect(
    (state: ApplicationState) => state.timerHistory,
    actionCreators
)(Popup);


