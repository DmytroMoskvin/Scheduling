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
        public void CreateTeam(string name, List<UserTeam> userTeams) =>
           Context.Teams.Add(new Team { Name = name, UserTeams = userTeams });

        public bool RemoveTeam(int teamId)
        {
            Team team = Context.Teams.FirstOrDefault(team => team.Id == teamId);
            if (team == null)
                return false;

            Context.Teams.Remove(team);
            Context.SaveChanges();
            return true;
        }

        public bool EditTeam(Team team)
        {
            Team removedTeam = Context.Teams.FirstOrDefault(t => t.Id == team.Id);

            if (removedTeam == null)
                return false;

            Context.Remove(removedTeam);
            Context.Add(team);
            Context.SaveChanges();

            return true;
        }

        public List<Team> GetListOfAvailableTeams() =>
            Context.Teams.Include(t => t.UserTeams).ToList();

        public Team GetTeam(int teamId)
        {
            return Context.Teams.Include(t => t.UserTeams).FirstOrDefault(t => t.Id == teamId);
        }

        public List<User> GetTeamUsers(int teamId)
        {
            var team = Context.Teams
                .Include(t => t.UserTeams)
                .ThenInclude(it => it.User)
                .FirstOrDefault(t => t.Id == teamId);

            return team.UserTeams.Select(it => it.User).ToList();
        }

    }
}
