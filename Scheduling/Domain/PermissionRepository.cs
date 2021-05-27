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

        public List<Permission> GetPermissions(int id)
        {
            var user = Context.Users
                .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission).FirstOrDefault(us => us.Id == id);
            if (user != null)
                return user.UserPermissions.ConvertAll(up => up.Permission);

            return null;
            /*User user = Context.Users.FirstOrDefault(user => user.Id == id);
            if (user == null)
                return new List<Permission>();

            List<UserPermission> userPermissions = Context.UserPermissions.Where(permission => permission.UserId == user.Id).ToList<UserPermission>();
            List<Permission> permissions = new List<Permission>();

            foreach (UserPermission userPermission in userPermissions)
            {
                permissions.Add(Context.Permissions.Single(permission => permission.Id == userPermission.PermisionId));
            }
            return permissions;*/
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
            /*List<Permission> allPermissions = Context.Permissions.ToList();
            List<string> permissions = new List<string>();

            foreach (Permission permission in allPermissions)
            {
                permissions.Add(permission.Name);
            }*/

            return Context.Permissions.ToList();
        }

        public bool RemoveUserPermission(int userId, PermissionName permissionName)
        {
            /*Permission permission = Context.Permissions.FirstOrDefault(permission => permission.Name == permissionName);
            if (permission == null)
                return false;*/
            var user = Context.Users
                .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission).FirstOrDefault(us => us.Id == userId);

            UserPermission userPermission = user.UserPermissions.Find(up => up.Permission.Name == permissionName);
            if (userPermission == null)
                return false;

            user.UserPermissions.Remove(userPermission);

            /*UserPermission userPermission = Context.UserPermissions.FirstOrDefault(perm => perm.PermisionId == permission.Id && perm.UserId == userId);
            if (userPermission == null)
                return false;

            Context.UserPermissions.Remove(userPermission);*/
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
