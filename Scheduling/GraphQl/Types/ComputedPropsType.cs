using GraphQL.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types
{
    public class ComputedPropsType : ObjectGraphType<ComputedProps>
    {
        public ComputedPropsType()
        {
            Name = "ComputedProps";
            Field(f => f.Permissions).Description("User permissions");
            Field<ListGraphType<TeamType>>(nameof(ComputedProps.Teams));
            Field<ListGraphType<TimerHistoryType>>(nameof(ComputedProps.TimerHistories));
            Field<ListGraphType<VacationRequestType>>(nameof(ComputedProps.VacationRequests));
        }
    }
}
