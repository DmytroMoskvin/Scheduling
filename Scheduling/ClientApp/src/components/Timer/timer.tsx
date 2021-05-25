import React, { Component, LegacyRef } from "react";
import * as EasyTimer from "easytimer.js";
import { actionCreators } from "../../store/Timer/actions";
import { connect, useDispatch } from 'react-redux';
import { addTimerFinish, addTimerStart, getUserTimerData } from "../../webAPI/timer";
import Cookies from "js-cookie";
import { ApplicationState } from "../../store/configureStore";
import { Data } from "popper.js";
import { TimerType } from "../../store/Timer/types";

interface IProps {
    addTime: (time: TimerType) =>
        ({
        type: "ADD_TIME",
        time: TimerType
        })
    date: Date
}

interface IState {
    timer_text?: string;
    timer: EasyTimer.Timer;
    timer_state: string
}

class Timer extends React.Component<IProps, IState> {
    private pauseButton: React.RefObject<HTMLButtonElement>;
    constructor(props: IProps) {
        super(props);

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
            let startTime: Date;
            var lastValue: {
                finishTime: Date,
                startTime: Date,
            };
            data.data.getCurrentUser.computedProps.timerHistories.forEach(function (v, i) {
                if (
                    // get all properties and check any of it's value is null
                    Object.keys(v).some(function (k) {
                        return v[k] == null;
                    })
                )
                    lastValue = v;
            });

            if (lastValue == undefined) {
                return;
            }
            if (lastValue.finishTime == null) {
                startTime = ((new Date((new Date(lastValue.startTime)).toString() + " UTC")));
                this.state.timer.start({ startValues: { seconds: (Math.floor((new Date().getTime() - new Date(startTime).getTime()) / 1000)) } });
                this.setState({
                    timer_state: "ticking"
                })
            }
        }

    }
    componentWillUnmount() {
        if (this.state.timer !== null) {
            this.state.timer.stop();
        }
    }

    onTimerUpdated() {
        this.setState({
            ...this.state,
            timer_text: this.state.timer.getTimeValues().toString()
        });
    }

    async startTimer() {
        console.log(this.props);

        this.setState({
            ...this.state,
            timer_state: "ticking"
        })
        const token = Cookies.get('token');
        if (token) {
            const dataGetTimer = await getUserTimerData(token);

            var lastValue: {
                finishTime: Date,
                startTime: Date,
            };;
            dataGetTimer.data.getCurrentUser.computedProps.timerHistories.forEach(function (v, i) {
                if (
                    // get all properties and check any of it's value is null
                    Object.keys(v).some(function (k) {
                        return v[k] == null;
                    })
                )
                    lastValue = v;
            });
            let data;
            let currentTimerValue;
            if (lastValue == null) {
                data = await addTimerStart(token);
                data.data.addTimerStartValue.startTime = data.data.addTimerStartValue.startTime.split("Z")[0];
                if (new Date(this.props.date).getMonth() == new Date().getMonth())
                    if (data.data) {
                        this.props.addTime(data.data.addTimerStartValue);
                        this.state.timer.start(); ///
                    }
            }
            else { ///asdasdasdasd
                this.props.addTime(lastValue);
                currentTimerValue = ((new Date((new Date(lastValue.startTime)).toString() + " UTC")));

                //this.state.timer.start({ startValues: { seconds: (Math.floor((new Date().getTime() - new Date(lastValue).getTime()) / 1000)) } });

                console.log({ startValues: { seconds: (Math.floor((new Date().getTime() - new Date(currentTimerValue).getTime()) / 1000)) } });
                
                this.setState({
                    timer_state: "ticking"
                });
                this.state.timer.start({ startValues: { seconds: (Math.floor((new Date().getTime() - new Date(currentTimerValue).getTime()) / 1000)) } } );
            }
        }
    }

    async resetTimer() {
        this.state.timer.reset();
        this.state.timer.pause();

        console.log(this.state.timer.getTimeValues().toString());
        this.setState({
            ...this.state,
            timer_text: "00:00:00",
            timer_state: "pause"
        })
        const token = Cookies.get('token');
        if (token) {
            type MyData = {
                data: {
                    addTimerFinishValue: { finishTime: string, id: number }
                    }
            };

            const data:MyData = await addTimerFinish(token);
            if (data.data.addTimerFinishValue != null) {
                //data.data.addTimerFinishValue.finishTime = new Date(data.data.addTimerFinishValue.finishTime).toISOString();
                if (new Date(data.data.addTimerFinishValue.finishTime).getMonth() == new Date().getMonth())
                    if (data.data) {
                        this.props.addTime({
                            finishTime: new Date(data.data.addTimerFinishValue.finishTime.split("Z")[0]),
                            id: data.data.addTimerFinishValue.id,
                            startTime: "",
                            isModified: false
                        });
                    }
                console.log(new Date(new Date(data.data.addTimerFinishValue.finishTime) + " UTC"),)
                console.log(new Date(data.data.addTimerFinishValue.finishTime.split("Z")[0]));
                console.log(data.data.addTimerFinishValue.finishTime.split("Z")[0]);
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

                            let pausedTimerstr = YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
                            console.log(pausedTimerstr);
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
