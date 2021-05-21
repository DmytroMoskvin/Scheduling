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
            Context.Users
                .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission)
                .Include(u => u.Team).ToList();

        public User Get(int id)
        {
            return Context.Users
                .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission)
                .Include(u => u.Team)
                .FirstOrDefault(us => us.Id == id);
        }

        public User Get(string email)
        {
            return Context.Users
                .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission)
                .Include(u => u.Team)
                .FirstOrDefault(us => us.Email == email);
        }


        public User CreateUser(string name, string surname, string email,
            string position, string department, string password, List<PermissionName> permissionNames, int teamId)
        {
            //string userId = Guid.NewGuid().ToString();
            if (Context.Users.FirstOrDefault(u => u.Email == email) != null) 
                throw new Exception("Email has been already used.");
            
            var salt = Guid.NewGuid().ToString();
            var permissions = new List<Permission>(
                Context.Permissions
                    .Where(p => permissionNames.Contains(p.Name))
                );
            /* foreach (var permission in permissions)
             {
                 userPermissions.Add(new UserPermission {Permission = permission});
             }*/
            var userPermissions = permissions
                .ConvertAll(p => new UserPermission() {Permission = p});
          
            var user = new User()
            {
                Email = email,
                Password = Hashing.GetHashString(password + salt),
                Name = name,
                Surname = surname,
                Position = position,
                Department = department,
                Salt = salt,
                Team = GetTeam(teamId),
                UserPermissions = userPermissions
            };

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
        public bool EditUser(int id, string email, string name, string surname,
            string position/*, List<PermissionName> permissionNames, int teamId*/)
        {
            var user = Context.Users.Single(it => it.Id == id);
            user.Email = email;
            user.Name = name;
            user.Surname = surname;
            user.Position = position;
            Context.Users.Update(user);
            Context.SaveChanges();
            return true;
        }
    }
}