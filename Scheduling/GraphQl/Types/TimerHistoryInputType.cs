using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types
{
    public class TimerHistoryInputType : InputObjectGraphType
    {
        public TimerHistoryInputType()
        {
            Name = "TimerHistoryInputType";
            Field<NonNullGraphType<IntGraphType>>("Id");
            Field<NonNullGraphType<DateGraphType>>("StartTime");
            Field<NonNullGraphType<DateGraphType>>("FinishTime");
        }
    }
}
