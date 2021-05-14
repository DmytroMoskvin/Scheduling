import './style.css';
import * as React from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

class CalendarPopUp extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            active: false,
            value: moment().toDate()
        };
    };
    

    validateTime() {
        let startWorkTime = new Date((document.getElementById('start-work-time') as HTMLInputElement).valueAsDate);
        debugger
        let endWorkTime = new Date((document.getElementById('end-work-time') as HTMLInputElement).valueAsDate);
        if (startWorkTime.getTime() && endWorkTime.getTime() && startWorkTime.getTime() < endWorkTime.getTime())
            return { startWorkTime, endWorkTime}
        return null
    }

    countAmount = () => {
        var daysLag = 'Incorrect';
        let time = this.validateTime();
        if (time) {
            daysLag = 'Correct';
        }
        (document.getElementById('error') as HTMLInputElement).value = daysLag;
    }

    
    render() {

        return (
            <React.Fragment>
                <div className={this.props.children ? "popUp active" : "popUp active"} >
                    <div className="pop__content" >
                        <form>
                        <h2 className="popHead">Plan your time</h2>
                        <DatePicker className="datePick" selected={moment().toDate()} onChange={date => (date)} locale="ua" />
                        <br />
                            <input type="time" id="start-work-time"  onInput={this.countAmount} />
                            <input type="time" id="end-work-time" onInput={this.countAmount} />
                            <br />
                            <input id='error' readOnly/>
                        
                        </form>
                    </div>
                </div>

            </React.Fragment>
        );
    }
};


export default CalendarPopUp;