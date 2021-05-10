using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class TimerHistory
    {
        public int Id { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? FinishTime { get; set; }

        public void AddStartTime(DateTime startTime)
        {
            StartTime = startTime;
        }
        public void AddFinishTime(DateTime finishTime)
        {
            FinishTime = finishTime;
        }
    }
}
