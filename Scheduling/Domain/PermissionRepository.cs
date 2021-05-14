using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {

        public List<Permission> GetPermission(int id)
        {
            User user = Context.Users.FirstOrDefault(user => user.Id == id);
            if (user == null)
                return new List<Permission>();

            List<UserPermission> userPermissions = Context.UserPermissions.Where(permission => permission.UserId == user.Id).ToList<UserPermission>();
            List<Permission> permissions = new List<Permission>();

            foreach (UserPermission userPermission in userPermissions)
            {
                permissions.Add(Context.Permissions.Single(permission => permission.Id == userPermission.PermisionId));
            }
            return permissions;
        }

        public void CreateUserPermission(int userId, string permissisonName)
        {
            Permission permission = Context.Permissions.FirstOrDefault(permission => permission.Name == permissisonName);
            if (permission == null)
                return;

            var userPermission = new UserPermission() 
            { 
                UserId = userId, 
                PermisionId = permission.Id
            };

            Context.UserPermissions.Add(userPermission);
            Context.SaveChanges();
        }

        public List<string> GetAllPermissions()
        {
            List<Permission> allPermissions = Context.Permissions.ToList();
            List<string> permissions = new List<string>();

            foreach (Permission permission in allPermissions)
            {
                permissions.Add(permission.Name);
            }

            return permissions;
        }

        public bool RemoveUserPermission(int userId, string permissionName)
        {
            Permission permission = Context.Permissions.FirstOrDefault(permission => permission.Name == permissionName);
            if (permission == null)
                return false;

            UserPermission userPermission = Context.UserPermissions.FirstOrDefault(perm => perm.PermisionId == permission.Id && perm.UserId == userId);
            if (userPermission == null)
                return false;

            Context.UserPermissions.Remove(userPermission);
            Context.SaveChanges();
            return true;
        }

        public bool RemoveUserPermissions(int userId)
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
        }


    }
}
