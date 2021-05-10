using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class UserTimerHistory
    {
        public int Id { get; set; }
        public int TimerHistoryId { get; set; }
        public int UserId { get; set; }
    }
}
