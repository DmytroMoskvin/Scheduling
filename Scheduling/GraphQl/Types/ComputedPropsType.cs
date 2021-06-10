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
            Field<ListGraphType<UserPermissionType>>(nameof(ComputedProps.UserPermissions));
            Field<UserTeamType>(nameof(ComputedProps.UserTeam));
            Field<ListGraphType<VacationRequestType>>(nameof(ComputedProps.VacationRequests));
        }
    }
}
