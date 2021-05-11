import './style.css';
import * as React from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

class CalendarPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
            value: moment().toDate()
        };
        this.closeEvent = this.closeEvent.bind(this);
    };
    

    closeEvent() {
        this.setState({
            active: !this.state.active
        });
    }

    validateTime() {
        //let startWorkTime = new Date((document.getElementById('start-work-time') as HTMLInputElement).valueAsDate);
        //debugger
        //let endWorkTime = new Date((document.getElementById('end-work-time') as HTMLInputElement).valueAsDate);
        //if (startWorkTime.getTime() && endWorkTime.getTime() && startWorkTime.getTime() < endWorkTime.getTime())
        //    return { startWorkTime, endWorkTime}
        //return null
    }

    countAmount = () => {
        //var daysLag = 'Incorrect';
        //let time = this.validateTime();
        //if (time) {
        //    daysLag = 'Correct';
        //}
        //(document.getElementById('error') as HTMLInputElement).value = daysLag;
    }

    
    render() {

        return (
            <React.Fragment>
                <div className={this.state.active ? "popUp active" : "popUp"} >
                    <div className="pop__content" >
                        <form>
                            <h2 className="popHead">Plan your time</h2>

                            <input type='date' id='work-date' onInput={this.countAmount}></input>
                            <br />
                            <input type="time" id="start-work-time" onInput={this.countAmount} />
                            <input type="time" id="end-work-time" onInput={this.countAmount} />
                            <br />
                            <input type="text" id='isCorrect' readOnly />
                            <button id='close-event' type='button' onClick={this.closeEvent}>Close</button>
                            <button id='send-event' type='button' onClick={this.handleSubmit}>Set time</button>
                        </form>
                    </div>
                </div>

            </React.Fragment>
        );
    }
};


export default CalendarPopUp;