import './style.css';
import * as React from 'react';
import { useState } from 'react';


class CalendarPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false };
        this.setActive = this.setActive.bind(this);
    }


    setActive() {
        this.setState(state => ({
            active: !state.active
        }));
        
    }

    render() {
        return (
            <React.Fragment>
                <button id='close-event' type='button' onClick={this.setActive}>Set time</button>
                <div className={this.state.active ? "popUp active" : "popUp"} >
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


export default CalendarPopUp;