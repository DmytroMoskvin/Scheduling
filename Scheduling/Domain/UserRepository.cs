using Scheduling.Models;
using Scheduling.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {
        public IEnumerable<User> Get() =>
          Context.Users;

        public User Get(string email) =>
            Context.Users.FirstOrDefault(user => user.Email == email);
        private void CheckDublicatedEmail(string email)
        {
            User checkUser = Context.Users.FirstOrDefault(user => user.Email == email);

            if (checkUser != null)
                throw new Exception("Dublicated, user email existed");
        }

        public User CreateUser(string name, string surname, string email, string password, List<string> permissions, List<int> teams)
        {
            string salt = Guid.NewGuid().ToString();

            CheckDublicatedEmail(email);

            User user = new()
            {
                Email = email,
                Password = Hashing.GetHashString(password + salt),
                Name = name,
                Surname = surname,
                Salt = salt
            };

            Context.Users.Add(user);
            Context.SaveChanges();

            foreach (string perm in permissions)
            {
                CreateUserPermission(user.Id, perm);
            }

            foreach (int teamId in teams)
            {
                AddUserToTeam(user.Id, teamId);
            }

            return user;
        }


        public bool RemoveUser(string email)
        {
            User user = Context.Users.FirstOrDefault(user => user.Email == email);

            if (user == null)
                return false;

            RemoveUserPermissions(user.Id);

            List<UserTeams> teams = Context.UserTeams.Where(team => team.UserId == user.Id).ToList();
            foreach (UserTeams team in teams)
            {
                RemoveUserFromTeam(team.UserId, team.TeamId);
            }

            Context.Users.Remove(user);
            Context.SaveChanges();
            return true;
        }

        public bool EditUser(User user)
        {
            if (Context.Users.FirstOrDefault(u => u.Id == user.Id) == null)
                return false;

            Context.Users.Update(user);
            Context.SaveChanges();

            RemoveUserPermissions(user.Id);

            if (user.ComputedProps != null)
            {
                foreach (string permmision in user.ComputedProps.Permissions)
                {
                    CreateUserPermission(user.Id, permmision);
                }
            }

            return true;
        }

    }
}
