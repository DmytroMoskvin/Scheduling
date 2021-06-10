using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class ComputedProps
    {
        public List<UserPermission> UserPermissions { get; set; }

        public UserTeam UserTeam { get; set; }

        public List<VacationRequest> VacationRequests { get; set; }

        public ComputedProps()
        {

        }

        public void AddPermission(List<Permission> permissions)
        {
            //Permissions = permissions;
            /*foreach (Permission permission in permissions)
                Permissions.Add(permission.Name);*/
        }
    }
}
