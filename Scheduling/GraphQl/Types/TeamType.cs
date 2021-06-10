using GraphQL.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl.Types 
{
    public class TeamType : ObjectGraphType<Team>
    {
        public TeamType()
        {
            Name = "Team";

            Field(t => t.Id).Description("Team id");
            Field(team => team.Name).Description("Team name");
            Field(team => team.UserTeams, type: typeof(UserTeamType)).Description("User teams");
        }
    }
}
