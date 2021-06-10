using GraphQL.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types
{
    public class UserTeamType : ObjectGraphType<UserTeam>
    {
        public UserTeamType()
        {
            Name = "UserTeam";
            Description = "User and one's team";
            Field(ut => ut.UserId).Description("User id.");
            Field(ut => ut.User, type: typeof(UserType)).Description("User.");
            Field(ut => ut.TeamId).Description("Team.");
            Field(ut => ut.Team, type: typeof(TeamType)).Description("Team.");
        }
    }
}
