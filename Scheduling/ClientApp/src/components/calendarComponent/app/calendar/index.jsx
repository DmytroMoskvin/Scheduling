import React, { useState, useEffect } from "react";

import "./style.css";
import buildCalendar from "./build";
import dayStyles, { beforeToday } from "./styles";
import Header from "./header";

export default function Calendar({ value, onChange }) {
    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        setCalendar(buildCalendar(value));
    }, [value]);

    return (
        <div className="calendar">
            <Header value={value} setValue={onChange} />
            <div className="body">
                <div className="day-names">
                    {
                        ["m", "t", "w", "t", "f", "s", "s"].map(d => (
                            <div className="week">{d}</div>
                        ))
                    }
                </div>
                {calendar.map((week) => (
                    <div>
                        {week.map((day) => (
                            <div className="day" onClick={() => !beforeToday(day) && onChange(day)}>
                                <div className={dayStyles(day, value)}>
                                    {day.format("D").toString()}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>)
}