using GraphQL.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types
{
    public class TimerHistoryType : ObjectGraphType<TimerHistory>
    {
        public TimerHistoryType()
        {
            Name = "TimerHistory";
            Description = "History of a timer";

            Field(l => l.Id).Description("Id of timer record.");
            Field(l => l.StartTime, nullable: true).Description("Value when timer was runned");
            Field(l => l.FinishTime, nullable: true).Description("Value when timer was stopped");
        }
    }
}
