import React from 'react'
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { useState } from 'react';
import events from "./events";
import CalendarPopUp from '../popup/CalendarPopUp';
//import Layout from 'react-tackle-box/Layout'
import moment from "moment";
import "./react-big-calendar.css";
//import ExampleControlSlot from '../ExampleControlSlot'
//let allViews = Object.keys(Views).map(k => Views[k])

/*const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })*/
moment.locale('en-gb', {
  week: {
    dow: 1,
    doy: 1,
  },
});

const localizer = momentLocalizer(moment)
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: events,
            active: false
        };

        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        this.setState(state => ({
            active: !state.active
        }));
    }
    
  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
       
    this.setState({
      events: nextEvents
    });
  };
    
    
  render() {
      return (
          <>
              <CalendarPopUp  />
      <Calendar
        /*  events={this.state.events}
            views={Views.WEEK}
            step={60}
            showMultiDayTimes
            //max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
            defaultDate={new Date(2015, 3, 1)}
        */
        min={new Date(0, 0, 0, 7, 0, 0)}
        max={new Date(2021, 5, 20, 22, 0, 0)}
        events={this.state.events}
        nEventDrop={this.moveEvent}
        //resizable

        onEventResize={this.resizeEvent}
        onView={Views.WEEK}
        views={Views.WEEK}
        defaultView={Views.WEEK}

        //defaultView={BigCalendar.Views.WEEK}
        //  defaultDate={new Date(2015, 3, 13, 7, 0, 0)}
        //defaultDate = {new Date(new Date().setHours(new Date().getHours()))}
        //Date = {new Date(2021,5,20,0,0,0)}
        localizer={localizer}
                  culture={'en-GB'} />
              
         </>
        
    )
  }
}


export default App
