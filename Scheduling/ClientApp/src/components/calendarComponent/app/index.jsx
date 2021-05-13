import React, { useState } from "react";

import moment from "moment";
import App2 from "./bigcalendar/App";
import "./styles.css";
import Calendar from './calendar';

export default function AppCalendar() {
    moment.updateLocale('ru', { week: { dow: 1 } });
    //moment.locale('en-GB');
    const [value, setValue] = useState(moment());
    const [eventActive, setEventActive] = useState(false)
    return <div>
        <App2 value={value} onChange={setValue} />
    </div>;
}