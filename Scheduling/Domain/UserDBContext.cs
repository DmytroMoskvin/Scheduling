using Microsoft.EntityFrameworkCore;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    public class UserDBContext : DbContext
    {
        public UserDBContext(DbContextOptions<UserDBContext> options) : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<VacationRequest> VacationRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
               .Entity<Permission>()
               .Property(e => e.Name)
               .HasConversion(
                   v => v.ToString(),
                   v => (PermissionName)Enum.Parse(typeof(PermissionName), v));

            modelBuilder.Entity<UserPermission>()
                .HasKey(u => new { u.UserId, u.PermissionId });

            modelBuilder.Entity<UserPermission>()
                .HasOne(up => up.User)
                .WithMany(u => u.UserPermissions)
                .HasForeignKey(up => up.UserId);

            modelBuilder.Entity<User>()
                .Navigation(up => up.UserPermissions)
                .UsePropertyAccessMode(PropertyAccessMode.Property);

            modelBuilder.Entity<UserPermission>()
                .HasOne(up => up.Permission)
                .WithMany(p => p.UserPermissions)
                .HasForeignKey(p => p.PermissionId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Team)
                .WithMany(t => t.Users);

            modelBuilder.Entity<VacationRequest>()
                .HasOne(vr => vr.User)
                .WithMany(u => u.VacationRequests);



            modelBuilder.Entity<UserPermission>().HasData(new List<UserPermission>
            {
                new UserPermission {PermissionId = 2, UserId = 1321313},
                new UserPermission {PermissionId = 4, UserId = 1321313},
                new UserPermission {PermissionId = 3, UserId = 13213133},
            });


            modelBuilder.Entity<Permission>().HasData(new Permission
            {
                Id = 1,
                Name = PermissionName.Accountant,
            });

            modelBuilder.Entity<Permission>().HasData(new Permission
            {
                Id = 2,
                Name = PermissionName.UserManagement,
            });

            modelBuilder.Entity<Permission>().HasData(new Permission
            {
                Id = 3,
                Name = PermissionName.TimeTracking,
            });

            modelBuilder.Entity<Permission>().HasData(new Permission
            {
                Id = 4,
                Name = PermissionName.VacationApprovals,
            });


            modelBuilder.Entity<Team>().HasData(new Team
            {
                Id = 1,
                Name = "Development",
            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1321313,
                Email = "admin@gmail.com",
                Password = "5dj3bhWCfxuHmONkBdvFrA==",
                Name = "Admin",
                Surname = "Adminov",
                Position = "lol",
                Department = "Memes",
                Salt = "91ed90df-3289-4fdf-a927-024b24bea8b7",
                TeamId = 1,
            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 13213133,
                Email = "user@gmail.com",
                Password = "u9DAYiHl+liIqRMvuuciBA==",
                Name = "User",
                Surname = "Userov",
                Position = "lol",
                Department = "Memes",
                Salt = "f0e30e73-fac3-4182-8641-ecba862fed69",
                TeamId = 1,
            });

            modelBuilder.Entity<VacationRequest>().HasData(new VacationRequest
            {
                Id = 1,
                UserId = 13213133,
                StartDate = new DateTime(2021, 04, 20),
                FinishDate = new DateTime(2021, 05, 20),
                Status = "Declined. Declined by PM. Declined by TL.",
                Comment = "I want to see a bober."
            });
            modelBuilder.Entity<VacationRequest>().HasData(new VacationRequest
            {
                Id = 2,
                UserId = 13213133,
                StartDate = new DateTime(2021, 04, 22),
                FinishDate = new DateTime(2021, 04, 28),
                Status = "Declined. Declined by PM. Declined by TL.",
                Comment = "I really want to see a bober."
            });
            modelBuilder.Entity<VacationRequest>().HasData(new VacationRequest
            {
                Id = 3,
                UserId = 13213133,
                StartDate = new DateTime(2021, 04, 25),
                FinishDate = new DateTime(2021, 04, 29),
                Status = "Pending consideration...",
                Comment = "Please, it`s my dream to see a bober."
            });
        }
    }
}
