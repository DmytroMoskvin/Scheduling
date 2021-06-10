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
            return Context.UserPermissions
                .Where(it => it.UserId == userId)
                .Select(it => it.Permission)
                .ToList();
        }

        public List<Permission> GetAllPermissions()
        {
            return Context.Permissions.ToList();
        }

    }
}
