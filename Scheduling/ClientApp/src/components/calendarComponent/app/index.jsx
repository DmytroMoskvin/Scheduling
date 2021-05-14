import React, { useState } from "react";

import moment from "moment";
import App2 from "./bigcalendar/App";
import "./styles.css";
import Calendar from './calendar';
import CalendarPopUp from './popup/CalendarPopUp';

export default function AppCalendar() {
    moment.updateLocale('ru', { week: { dow: 1 } });
    //moment.locale('en-GB');
    const [value, setValue] = useState(moment());
    const [eventActive, setEventActive] = useState(false)
    return <div>
        
        <Calendar value={value} onChange={setValue} />
        <App2 />
    </div>;
}