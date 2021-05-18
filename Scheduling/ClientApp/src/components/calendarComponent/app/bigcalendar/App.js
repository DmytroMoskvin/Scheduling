import React from 'react'
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { useState } from 'react';
//import { DragDropContext } from "react-dnd";
import events from "./events";
import CalendarEvent from '../popup/CalendarEvent';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
//import Layout from 'react-tackle-box/Layout'
import moment from "moment";
import "./react-big-calendar.css";
import "./styles.css";
//import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import Calendar2 from "../calendar/index";

import 'moment/locale/en-gb'
//import ExampleControlSlot from '../ExampleControlSlot'
//let allViews = Object.keys(Views).map(k => Views[k])

/*const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })*/
  const DragAndDropCalendar = withDragAndDrop(Calendar);
moment.locale('en-gb', {
    week: {
        dow: 1,
        doy: 1,
    },
});

let reg = /\d+/g;

const localizer = momentLocalizer(moment)
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: events,
            dayToday: new Date(new Date().setHours(new Date().getHours())),
              displayDragItemInCell: true
        };
        this.moveEvent = this.moveEvent.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.changeDay = this.changeDay.bind(this);
      //  this.newEvent = this.newEvent.bind(this)
    };
    handleSelect = ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title)
        this.setState({
          events: [
            ...this.state.events,
            {
              start,
              end,
              title,
            },
          ],
        })
      }
      onSelectEvent(pEvent) {
   const r = window.confirm("Would you like to remove this event?")
   if(r === true){

     this.setState((prevState, props) => {
       const events = [...prevState.events]
       const idx = events.indexOf(pEvent)
       events.splice(idx, 1);
       return { events };
     });
   }
 }
    handleClick() {
        this.setState(state => ({
            active: !state.active
        }));
    }

    changeDay(day) {
        this.setState({
            dayToday: day
        });
    }
    moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    });
  }

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    });

        this.setState({
            events: nextEvents
        });
    };


    render() {
        return (
            <>
<div class="flexCalendar">

                <DragAndDropCalendar
                    /*  events={this.state.events}
                        views={Views.WEEK}
                        step={60}
                        showMultiDayTimes
                        //max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
                        defaultDate={new Date(2015, 3, 1)}
                    */
                    selectable
                    min={new Date(0, 0, 0, 7, 0, 0)}
                    max={new Date(0, 0, 0, 22, 0, 0)}
                    events={this.state.events}
                    onEventDrop={this.moveEvent}
                    //onSelectSlot={this.newEvent}
                    resizable
                    onSelectSlot={this.handleSelect}
                    onEventResize={this.resizeEvent}
                    onSelectEvent = {event => this.onSelectEvent(event)}
                    //onView={Views.WEEK}
                    views={['week']}
                    defaultView={Views.WEEK}

                    date={new Date(
                        parseInt(this.state.dayToday.toString().match(reg)[2]),
                        parseInt(this.state.dayToday.toString().match(reg)[0]) - 1,
                        parseInt(this.state.dayToday.toString().match(reg)[1]))}

                    //onNavigate={date => { this.setState({ selectedDate: date }) }}
                    //defaultView={BigCalendar.Views.WEEK}
                    //defaultDate={this.state.dayToday}
                    defaultDate = {new Date(new Date().setHours(new Date().getHours()))}
                    //Date = {new Date(2021,5,20,0,0,0)}
                    localizer={localizer}
                    culture={'en-GB'} />
                    <Calendar2 value={this.props.value} onChange={this.props.onChange} setDay={this.changeDay} />
</div>
                    <CalendarEvent />

            </>

        )
    }
}


export default App
