using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduling.Models;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {
        public List<CalendarEvent> GetUserEvents(int userId)
        {
            List<CalendarEvent> requests = Context.CalendarEvents.Where(r => r.UserId == userId).ToList();
            return requests;

        }
        public List<CalendarEvent> AddEvent(int userId, DateTime workDate, DateTime startWorkTime, DateTime endWorkTime)
        {
            CalendarEvent CalendarEvent = new CalendarEvent()
            {
                UserId = userId,
                WorkDate = workDate,
                StartWorkTime = startWorkTime,
                EndWorkTime = endWorkTime
            };

            Context.CalendarEvents.Add(CalendarEvent);
            Context.SaveChanges();

            return GetUserEvents(userId);

        }
        public List<CalendarEvent> RemoveEvents(int id)
        {
            CalendarEvent CalendarEvent = Context.CalendarEvents.Single(u => u.Id == id);
            Context.CalendarEvents.Remove(CalendarEvent);
            Context.SaveChanges();

            return GetUserEvents(CalendarEvent.UserId);

        }
    }
}
