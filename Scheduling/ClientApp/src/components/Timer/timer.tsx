﻿import React, { Component } from "react";
import * as EasyTimer from "easytimer.js";
import { actionCreators } from "../../store/Timer/actions";
import { connect, useDispatch } from 'react-redux';
import { addTimerFinish, addTimerStart, getUserTimerData } from "../../webAPI/timer";
import Cookies from "js-cookie";
import { ApplicationState } from "../../store/configureStore";

class Timer extends Component {
    private pauseButton: HTMLInputElement;
    constructor(props) {
        super(props);

        console.log(props);

        var timer = new EasyTimer.Timer();

        this.state = {
            timer_text: timer.getTimeValues().toString(),
            timer: timer,
            timer_state: "stopped"
        };
        //Bind the functions
        this.startTimer = this.startTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);

        this.pauseButton = React.createRef();
        //Add the listeners
        timer.addEventListener("secondsUpdated", this.onTimerUpdated.bind(this));

        timer.addEventListener("started", this.onTimerUpdated.bind(this));

        timer.addEventListener("reset", this.onTimerUpdated.bind(this));
    }
    async componentDidMount() {
        const token = Cookies.get('token');
        if (token) {
            const data = await getUserTimerData(token);
            let startTime;
            var lastValue = data.data.getCurrentUser.computedProps
                .timerHistories[data.data.getCurrentUser.computedProps.timerHistories.length - 1];
            if (lastValue.finishTime == null) {
                startTime = ((new Date((new Date(lastValue.startTime)).toString() + " UTC")));

                this.state.timer.start({ startValues: { seconds: parseInt(Math.floor((new Date() - startTime) / 1000)) } });
                this.state.timer_state = "ticking";
            }
        }

    }
    componentWillUnmount() {
        if (this.state.timer !== null) {
            this.state.timer.stop();
        }
    }

    onTimerUpdated(e) {
        this.setState({
            ...this.state,
            timer_text: this.state.timer.getTimeValues().toString()
        });
    }

    async startTimer() {
        this.state.timer.reset();
        this.state.timer.pause();
        this.state.timer.start();
        console.log(this.props);

        this.setState({
            ...this.state,
            timer_state: "ticking"
        })
        const token = Cookies.get('token');
        if (token) {
            const data = await addTimerStart(token);
            data.data.addTimerStartValue.startTime = data.data.addTimerStartValue.startTime.split("Z")[0];
            if (data.data) {
                this.props.addTime(data.data.addTimerStartValue);
            }
        }
    }

    async resetTimer() {
        this.state.timer.reset();
        this.state.timer.pause();
        this.setState({
            ...this.state,
            timer_text: this.state.timer.getTimeValues().toString(),
            timer_state: "pause"
        })
        const token = Cookies.get('token');
        if (token) {
            const data = await addTimerFinish(token);

            data.data.editTimerFinishValue.finishTime = new Date(data.data.editTimerFinishValue.finishTime).toISOString();

            if (data.data) {
                this.props.addTime({ finishTime: data.data.editTimerFinishValue.finishTime.split("Z")[0], id: data.data.editTimerFinishValue.id});
            }
        }
    }

    render() {
        return (
            <div style={{ textAlign: "center" }} className="Timer" >
                <div className="timer-text">
                    <h2>{this.state.timer_text}</h2>
                </div>
                <div className="timer-buttons text-center">
                    {this.state.timer_state !== "ticking" && (
                        <button onClick={() => {
                            this.startTimer();

                            var startTimer = new Date();
                            var DD = String(startTimer.getDate()).padStart(2, '0');
                            var MM = String(startTimer.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var YYYY = startTimer.getFullYear();

                            var hh = String(startTimer.getHours()).padStart(2, '0');
                            var mm = String(startTimer.getMinutes()).padStart(2, '0');
                            var ss = String(startTimer.getSeconds()).padStart(2, '0');

                            var startTimerStr = YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
                            console.log(startTimerStr);
                        }} className="btn-success">
                            <i className="fas fa-play"></i>
                        </button>
                    )}

                    {this.state.timer_state === "ticking" && (
                        <button onClick={() => {
                            var pausedTimer = new Date();
                            var DD = String(pausedTimer.getDate()).padStart(2, '0');
                            var MM = String(pausedTimer.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var YYYY = pausedTimer.getFullYear();

                            var hh = String(pausedTimer.getHours()).padStart(2, '0');
                            var mm = String(pausedTimer.getMinutes()).padStart(2, '0');
                            var ss = String(pausedTimer.getSeconds()).padStart(2, '0');

                            pausedTimer = YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
                            console.log(pausedTimer);
                            this.resetTimer();
                        }

                        } ref={this.pauseButton} className="btn-warning">
                            <i className="fas fa-stop"></i>
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.timerHistory,
    actionCreators
)(Timer);
