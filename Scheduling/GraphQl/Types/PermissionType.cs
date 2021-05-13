using GraphQL.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types
{
    public class PermissionType: ObjectGraphType<Permission>
    {
        public PermissionType()
        {
            Name = "Permission";

            Field(permission => permission.Id).Description("Permission id.");
            Field<PermissionNameEnum>("Name", resolve: p => p.Source.Name);
        }

    }
}
