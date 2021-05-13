import './style.css';
import * as React from 'react';

import { addEvent } from "../../../../webAPI/calendarEvent";

import Cookies from 'js-cookie';

interface ICalendarEventState {
    workDate: Date,
    startWorkTime: Date,
    endWorkTime: Date,
    active: boolean
}

class CalendarEvent extends React.PureComponent<{}, ICalendarEventState> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            workDate: new Date(),
            startWorkTime: new Date(),
            endWorkTime: new Date(),
            active: true
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateTime() {
        let workDate = new Date(new Date((document.getElementById('work-date') as HTMLInputElement).valueAsNumber));
        let startWorkTime = new Date(new Date((document.getElementById('start-work-time') as HTMLInputElement).valueAsNumber));
        let endWorkTime = new Date(new Date((document.getElementById('end-work-time') as HTMLInputElement).valueAsNumber));
        if (startWorkTime && endWorkTime && startWorkTime.getHours() <endWorkTime.getHours())
            return {workDate, startWorkTime, endWorkTime}
        return null
    }

    countAmount = () => {
        var correct = 'Incorrect time!';
        debugger
        let time = this.validateTime();
        if (time)
            correct = 'Correct!';
        (document.getElementById('isCorrect') as HTMLInputElement).value = correct;
    }

    async handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        const token = Cookies.get('token');
        let time = this.validateTime();
        if (time && token)
            await addEvent(time.workDate, time.startWorkTime, time.endWorkTime, token);

        this.setState({
            active:false
        });
    }

    

    async componentDidMount() {
        
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
                <div className="popUp active" >
                    <div className="pop__content" >
                        <form>
                        <h2 className="popHead">Plan your time</h2>
                            
                            <input type='date' id='work-date' onInput={this.countAmount}></input>
                        <br />
                            <input type="time" id="start-work-time"  onInput={this.countAmount} />
                            <input type="time" id="end-work-time" onInput={this.countAmount} />
                            <br />
                            <input type="text" id='isCorrect' readOnly />
                            <button id='close-event' type='button' onClick={this.setActive}>Close</button>
                            <button id='send-event' type='button' onClick={this.handleSubmit}>Set time</button>
                        </form>
                    </div>
                </div>

            </React.Fragment>
        );
    }
};


export default CalendarEvent;