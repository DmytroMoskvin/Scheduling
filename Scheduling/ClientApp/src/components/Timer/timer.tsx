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
            let startTime: Date;
            var lastValue = data.data.getCurrentUser.computedProps
                .timerHistories[data.data.getCurrentUser.computedProps.timerHistories.length - 1];
            if (lastValue.finishTime == null) {
                startTime = ((new Date((new Date(lastValue.startTime)).toString() + " UTC")));
                this.state.timer.start({ startValues: { seconds: (Math.floor((new Date().getTime() - startTime.getTime()) / 1000)) } });
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
            type MyData = {
                data: {
                        editTimerFinishValue: { finishTime: string, id: number }
                    }
            };

            const data:MyData = await addTimerFinish(token);

            data.data.editTimerFinishValue.finishTime = new Date(data.data.editTimerFinishValue.finishTime).toISOString();

            if (data.data) {
                this.props.addTime({ finishTime: new Date(data.data.editTimerFinishValue.finishTime.split("Z")[0]), id: data.data.editTimerFinishValue.id, startTime: "" });
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
