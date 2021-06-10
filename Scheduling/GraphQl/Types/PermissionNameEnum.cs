using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Language.AST;
using GraphQL.Types;
using Scheduling.Models;

namespace Scheduling.GraphQl.Types
{
    public class PermissionNameEnum : EnumerationGraphType<PermissionName>
    {
        public PermissionNameEnum()
        {
            Name = "PermissionName";
            Description = "One of the possible permissions";
        }
    }
}
