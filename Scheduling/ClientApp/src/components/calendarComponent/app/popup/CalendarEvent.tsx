import './style.css';
import * as React from 'react';
import { useState } from 'react';
import { addEvent, getUserEvents } from "../../../../webAPI/calendarEvent";
import { CalendarEventType } from "../../../../store/CalendarEvent/types"
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../../store/configureStore';
import { actionCreators } from '../../../../store/CalendarEvent/actions';

interface ICalendarEventState {
    workDate: string,
    startWorkTime: number,
    endWorkTime: number,
    active: boolean,
    isCorrect: boolean
}

interface ICalendarEventProps {
    eventHistory: Array<CalendarEventType>;
}



class CalendarEvent extends React.Component<ICalendarEventProps, ICalendarEventState> {
    constructor(props: ICalendarEventProps) {
        super(props);
        this.state = {
            workDate: "",
            startWorkTime: 0,
            endWorkTime: 0,
            active: false,
            isCorrect: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setActive = this.setActive.bind(this);
        this.setStartTime = this.setStartTime.bind(this);
        this.setEndTime = this.setEndTime.bind(this);
        this.setWorkDate = this.setWorkDate.bind(this);
    }

    

    async componentDidMount() {
        
        const token = Cookies.get('token');
        if (token) {
            
            const data = await getUserEvents(token);
            console.log(data);
        }

        
    }

    validateTime() {

        let workDateUnix = new Date(this.state.workDate);
        let workDate = workDateUnix.getTime() / 1000;

        let startWorkTime = this.state.startWorkTime;

        let endWorkTime = this.state.endWorkTime;

        if (workDate && startWorkTime && endWorkTime && startWorkTime < endWorkTime) 
            return { workDate, startWorkTime, endWorkTime }
        
        return null
    }

    async handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        const token = Cookies.get('token');

        let time = this.validateTime();

        if (time && token) {
            await addEvent(time.workDate, time.startWorkTime, time.endWorkTime, token);
        }
        
        this.setActive();
    }

    async setStartTime(e: { preventDefault: () => void; target: { value: string; }; }){
        e.preventDefault();

        let dateString = e.target.value;

        let startWorkTimeUnix = new Date(this.state.workDate + " " + dateString).getTime();

        let startWorkTime = (startWorkTimeUnix / 1000) + 10800;
        
        this.setState({
            startWorkTime: startWorkTime
        });
    }

    async setEndTime(e: { preventDefault: () => void; target: { value: string; }; }) {
        e.preventDefault();

        let dateString = e.target.value;

        let endWorkTimeUnix = new Date(this.state.workDate + " " + dateString).getTime();

        let endWorkTime = (endWorkTimeUnix / 1000) + 10800;

        
        this.setState({
            endWorkTime: endWorkTime
        });
    }

    async setWorkDate(e: { preventDefault: () => void; target: { value: string; }; }) {
        e.preventDefault();
        
        this.setState({
            workDate: e.target.value
        });
    }


    setActive() {
        this.setState({
            active: !this.state.active
        });
    }

    render() {
        return (
            <React.Fragment>

                <button id='close-event' type='button' onClick={this.setActive}>Set time</button>
                <div className={this.state.active ? "popUp active" : "popUp"} >
                    <div className="pop__content" >
                        <form>
                            <h2 className="popHead">Plan your time</h2>

                            <input type='date' id='work-date' onChange={e => this.setWorkDate(e)}  required></input>
                            <br />
                            <input type="time" id="start-work-time" onChange={e => this.setStartTime(e)} required/>
                            <input type="time" id="end-work-time" onChange={e => this.setEndTime(e)} required/>
                            <br />
                            <input type="text" id='isCorrect' readOnly value={(this.state.startWorkTime < this.state.endWorkTime) ? "Correct!" : "Incorrect time"} />
                            <button id='close-event-form' type='button' onClick={this.setActive}>Close</button>
                            <button id='send-event' type='button' onClick={this.handleSubmit}>Set time</button>
                        </form>
                    </div>
                </div>

            </React.Fragment>
        );
    }
};


export default connect(
    (state: ApplicationState) => state.calendarEvent,
    actionCreators
)(CalendarEvent);