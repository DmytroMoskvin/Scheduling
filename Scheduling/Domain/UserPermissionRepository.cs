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
        public List<UserPermission> GetUserPermissions(int userId)
        {
            return Context.UserPermissions
                .Where(it => it.UserId == userId)
                .Include(it => it.Permission)
                .ToList();
        }

        public void AddUserPermission(int userId, int permissionId)
        {
            Context.UserPermissions.Add(new UserPermission
            {
                PermissionId = permissionId,
                UserId = userId
            });
        }
    }
}
