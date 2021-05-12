using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Scheduling.Models;

namespace Scheduling.GraphQl.Types
{
    public class CalendarEventType : ObjectGraphType<CalendarEvent>
    {
        public CalendarEventType()
        {
            Name = "CalendarEvent";
            Description = "CalendarEvent info";

            Field(calendarEvent => calendarEvent.Id).Description("CalendarEvent id.");
            Field(calendarEvent => calendarEvent.UserId).Description("CalendarEvent user id.");
            Field(calendarEvent => calendarEvent.WorkDate).Description("CalendarEvent start work date.");
            Field(calendarEvent => calendarEvent.StartWorkTime).Description("CalendarEvent start work time.");
            Field(calendarEvent => calendarEvent.EndWorkTime).Description("CalendarEvent end work time.");
        }
    }
}
