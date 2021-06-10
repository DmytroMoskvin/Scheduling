using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {
        public void AddUserTeam(int userId, int teamId)
        {
            Context.UserTeams.Add(new UserTeam 
            { 
                UserId = userId, TeamId = teamId
            });
            Context.SaveChanges();
        }

        public UserTeam GetUserTeam(int userId)
        {
            return Context.UserTeams
                .Include(it => it.Team)
                .First(it => it.UserId == userId);
        }
    }
}
