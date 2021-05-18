using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduling.Models;

namespace Scheduling.Domain
{
    public class CalendarEventRepository
    {
        private readonly DBContext dbContext;

        public CalendarEventRepository(DBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<CalendarEvent> GetUserEvents(int userId)
        {
            return dbContext.CalendarEvents.Where(r => r.UserId == userId).ToList(); 
        }

        public CalendarEvent AddEvent(int userId, DateTime workDate, DateTime startWorkTime, DateTime endWorkTime)
        {
            var calendarEvent = new CalendarEvent()
            {
                UserId = userId,
                WorkDate = workDate,
                StartWorkTime = startWorkTime,
                EndWorkTime = endWorkTime
            };

            dbContext.CalendarEvents.Add(calendarEvent);
            dbContext.SaveChanges();

            return calendarEvent;
        }

        public void RemoveEvents(int id, int userId)
        {
            var calendarEvent = dbContext.CalendarEvents.SingleOrDefault(u => u.Id == id && u.UserId == userId);
            if (calendarEvent == null)
                return;

            dbContext.CalendarEvents.Remove(calendarEvent);
            dbContext.SaveChanges();
        }
    }
}
