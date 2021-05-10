using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types
{
    public class UserTimerHistoryInputType : InputObjectGraphType
    {
        public UserTimerHistoryInputType()
        {
            Name = "OrderItemInput";
            Field<NonNullGraphType<IntGraphType>>("timerHistoryId");
            Field<NonNullGraphType<IntGraphType>>("userId");
        }
    }
}
