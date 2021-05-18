using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class CalendarEvent
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime WorkDate { get; set; }

        public DateTime StartWorkTime { get; set; }

        public DateTime EndWorkTime { get; set; }

        public CalendarEvent()
        {

        }
    }
}
