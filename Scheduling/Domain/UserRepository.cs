using Scheduling.Models;
using Scheduling.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {
        public IEnumerable<User> Get() =>
            Context.Users.Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission).Include(u => u.Team).ToList();

        public User Get(string email)
        {
            return Context.Users
                .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission).Include(u => u.Team)
                .FirstOrDefault(us => us.Email == email);
        }
            

        public User CreateUser(string name, string surname, string email, string position, string password, List<Permission> permissions, int teamId)
        {
            string userId = Guid.NewGuid().ToString();
            string salt = Guid.NewGuid().ToString();
            User checkUser = Context.Users.FirstOrDefault(user => user.Email == email);

            if (checkUser != null)
            {
                return null;
            }

            List<UserPermission> userPermissions = new List<UserPermission>();

            foreach (var permission in permissions)
            {
                userPermissions.Add(new UserPermission {Permission = permission});
            }

            User user = new User()
            {
                Email = email,
                Password = Hashing.GetHashString(password + salt),
                Name = name,
                Surname = surname,
                Position = position,
                Department = "",
                Salt = salt,
                Team = GetTeam(teamId),
                UserPermissions = userPermissions
            };

            Context.Users.Add(user);
            Context.SaveChangesAsync();

           /* User newUser = Context.Users.Single(user => user.Email == email);

            //foreach (string perm in permission)
            //{
            //    CreateUserPermission(newUser.Id, perm);
            //}

            //if (teams == null)
            //    return newUser;

            foreach (int teamId in teams)
            {
                AddUserToTeam(user.Id, teamId);
            }*/

            return user;
        }


        public bool RemoveUser(string email)
        {
            User user = Context.Users.FirstOrDefault(user => user.Email == email);
            if (user == null)
                return false;
            //RemoveUserPermissions(user.Id);
            /*List<UserTeams> teams = Context.userTeams.Where(team => team.UserId == user.Id).ToList();
            foreach (UserTeams team in teams)
            {
                RemoveUserFromTeam(team.UserId, team.TeamId);
            }*/
            Context.Users.Remove(user);
            Context.SaveChangesAsync();
            return true;
        }
        public bool EditUser(User user)
        {
            if (Context.Users.Find(user.Id) == null)
                return false;

            if (!RemoveUser(user.Email))
                return false;

            /*if (!RemoveUser(user.Email))
                return false;*/
            /* List<Team> teams = GetUserTeams(user.Id);

             //RemoveUserPermissions(user.Id);

             foreach (Permission permmision in user.ComputedProps.Permissions)
             {
                 CreateUserPermission(user.Id, permmision.Name);
             }

             foreach (Team team in teams)
             {
                 AddUserToTeam(user.Id, team.Id);
             }*/
            Context.Users.Update(user);
            //Context.Users.Add(user);
            Context.SaveChanges();
            return true;
        }
    }
}