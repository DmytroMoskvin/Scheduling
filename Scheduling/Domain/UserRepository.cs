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

        public User CreateUser(string name, string surname, string email, string position, string password, List<string> permission, List<int> teams)
        {
            string userId = Guid.NewGuid().ToString();
            string salt = Guid.NewGuid().ToString();

            User checkUser = Context.Users.FirstOrDefault(user => user.Email == email);

            if (checkUser != null)
            {
                return null;
            }

            User user = new User()
            {
                Email = email,
                Password = Hashing.GetHashString(password + salt),
                Name = name,
                Surname = surname,
                Position = position,
                Department = "",
                Salt = salt
            };

            Context.Users.Add(user);
            Context.SaveChangesAsync();

            /*User newUser = Context.Users.Single(user => user.Email == email);*/

            //foreach (string perm in permission)
            //{
            //    CreateUserPermission(newUser.Id, perm);
            //}

            //if (teams == null)
            //    return newUser;

            //foreach (int teamId in teams)
            //{
            //    AddUserToTeam(user.Id, teamId);
            //}

            return user;
        }


        public bool RemoveUser(string email)
        {
            User user = Context.Users.FirstOrDefault(user => user.Email == email);

            if (user == null)
                return false;

            RemoveUserPermissions(user.Id);

            List<UserTeams> teams = Context.userTeams.Where(team => team.UserId == user.Id).ToList();
            foreach (UserTeams team in teams)
            {
                RemoveUserFromTeam(team.UserId, team.TeamId);
            }

            Context.Users.Remove(user);
            Context.SaveChangesAsync();
            return true;
        }

        public bool EditUser(string originalEmail, string name, string surname, string email, string position, string password, List<string> permission, List<int> teams)
        {
            User userToEdit = Context.Users.FirstOrDefault(user => user.Email == originalEmail);

            if (userToEdit == null)
                return false;

            userToEdit.Name = name;
            userToEdit.Surname = surname;
            userToEdit.Password = Hashing.GetHashString(password + userToEdit.Salt);
            userToEdit.Email = email;
            userToEdit.Position = position;

            /*foreach (Permission permmision in user.ComputedProps.Permissions)
            {
                CreateUserPermission(user.Id, permmision.Name);
            }

            foreach (Team team in teams)
            {
                AddUserToTeam(user.Id, team.Id);
            }*/

            Context.SaveChanges();
            return true;
        }

    }
}
