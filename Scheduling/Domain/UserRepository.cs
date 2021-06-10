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
        public List<User> Get() =>
            /*Context.Users
                .Include(u => u.ComputedProps)
                .ThenInclude(u => u.UserPermissions)
                .ThenInclude(up => up.Permission)
                .Include(u => u.ComputedProps)
                .ThenInclude(up => up.Team)
                .ToList();*/
            Context.Users.ToList();

        public IEnumerable<User> GetUsersWithCopmutedProps()
        {
            var users = Get();
            users.ForEach(u => u.ComputedProps = new ComputedProps());
            users.ForEach(u => u.ComputedProps.Team = GetUserTeam(u.Id));
            users.ForEach(u => u.ComputedProps.UserPermissions = GetUserPermissions(u.Id));

            return users;
        }

        public User Get(int id)
        {
            return Context.Users
                .First(us => us.Id == id);
        }

        public User Get(string email)
        {
            return Context.Users
                .FirstOrDefault(us => us.Email == email);
        }


        public User CreateUser(string name, string surname, string email,
            string position, string department, string password, List<int> permissionsIds, int teamId)
        {
            //string userId = Guid.NewGuid().ToString();
            if (Context.Users.Any(u => u.Email == email))
            {
                throw new Exception("User with such an id already exists.");
            }


            var salt = Guid.NewGuid().ToString();
            var permissions = new List<Permission>(Context.Permissions.Where(p => permissionsIds.Contains(p.Id)));
            var userPermissions = new List<UserPermission>();
            permissions.ForEach(p => userPermissions.Add(new UserPermission() { Permission = p }));

            var user = new User()
            {
                Email = email,
                Password = Hashing.GetHashString(password + salt),
                Name = name,
                Surname = surname,
                Position = position,
                Department = department,
                Salt = salt,
            };
            user.ComputedProps.Team = GetTeam(teamId);
            user.ComputedProps.UserPermissions = userPermissions;

            Context.Users.Add(user);
            Context.SaveChangesAsync();

            return user;
        }

        public bool RemoveUser(int id)
        {
            var user = Context.Users.FirstOrDefault(user => user.Id == id);
            if (user == null)
                return false;

            Context.Users.Remove(user);
            Context.SaveChangesAsync();
            return true;
        }

        public bool EditUser(int id, string name, string surname, string email,
            string position, string department, List<int> permissionsIds, int teamId)
        {
            var user = Context.Users.Single(it => it.Id == id);
            user.Email = email;
            user.Name = name;
            user.Surname = surname;
            user.Position = position;
            user.Department = department;
            user.ComputedProps.TeamId = teamId;

            user.ComputedProps.UserPermissions = Context.Permissions
                .Where(p => permissionsIds
                .Contains(p.Id))
                .Select(it => new UserPermission { UserId = id, PermissionId = it.Id })
                .ToList();

            Context.Users.Update(user);
            Context.SaveChanges();

            return true;
        }
    }
}