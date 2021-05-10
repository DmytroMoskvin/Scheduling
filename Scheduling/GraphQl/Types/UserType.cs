using GraphQL.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types
{
    public class UserType : ObjectGraphType<User>
    {
       public UserType()
       {
            Name = "User";
            Description = "User info";

            Field(user => user.Id).Description("User Id.");
            Field(user => user.Name).Description("User name.");
            Field(user => user.Surname).Description("User Surname.");
            Field(user => user.Email).Description("User email.");
            Field(user => user.Position).Description("User position.");
            Field(user => user.Department).Description("User department.");
            Field<ComputedPropsType>(nameof(User.ComputedProps));
        }
    }
}
