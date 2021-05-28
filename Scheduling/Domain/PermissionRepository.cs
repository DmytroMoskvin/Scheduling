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

        public List<Permission> GetPermissions(int userId)
        {
            return Context.Users
                .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission)
                .Single(us => us.Id == userId)
                .UserPermissions
                .Select(it => it.Permission)
                .ToList();
        }

        public void CreateUserPermission(int userId, int permissionId)
        {
            Permission permission = Context.Permissions.FirstOrDefault(permission => permission.Id == permissionId);
            if (permission == null)
                return;

            UserPermission userPermission = new UserPermission() { UserId = userId, PermissionId = permission.Id };
            permission.UserPermissions.Add(userPermission);
            Context.SaveChanges();
        }

        public List<Permission> GetAllPermissions()
        {
            return Context.Permissions.ToList();
        }

        public bool RemoveUserPermission(int userId, PermissionName permissionName)
        {
            var user = Context.Users
                .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission).FirstOrDefault(us => us.Id == userId);

            UserPermission userPermission = user.UserPermissions.Find(up => up.Permission.Name == permissionName);
            if (userPermission == null)
                return false;

            user.UserPermissions.Remove(userPermission);

            Context.SaveChanges();
            return true;
        }
        /*public bool RemoveUserPermissions(int userId)
        {
            List<UserPermission> userPermissions = Context.UserPermissions.Where(permission => permission.UserId == userId).ToList();

            if (userPermissions.Count == 0)
                return false;

            foreach (UserPermission userPermission in userPermissions)
            {
                Context.UserPermissions.Remove(userPermission);
            }

            Context.SaveChanges();
            return true;
        }*/


    }
}
