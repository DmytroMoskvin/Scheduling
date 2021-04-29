﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class Permission
    {
        public int Id { get; set; }
        public string Name { get; set; }

    }

    public enum PermissionName
    {
        UserManagement,
        Accountant,
        PartTime,
        FullTime,
        VacationApprovals
    }
}
