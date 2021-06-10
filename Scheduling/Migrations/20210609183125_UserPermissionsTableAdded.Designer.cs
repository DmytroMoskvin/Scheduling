﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Scheduling.Domain;

namespace Scheduling.Migrations
{
    [DbContext(typeof(UserDBContext))]
    [Migration("20210609183125_UserPermissionsTableAdded")]
    partial class UserPermissionsTableAdded
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Scheduling.Models.Permission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Permissions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Accountant"
                        },
                        new
                        {
                            Id = 2,
                            Name = "UserManagement"
                        },
                        new
                        {
                            Id = 3,
                            Name = "TimeTracking"
                        },
                        new
                        {
                            Id = 4,
                            Name = "VacationApprovals"
                        });
                });

            modelBuilder.Entity("Scheduling.Models.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Teams");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Development"
                        });
                });

            modelBuilder.Entity("Scheduling.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Department")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Position")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Salt")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TeamId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TeamId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1321313,
                            Department = "Memes",
                            Email = "admin@gmail.com",
                            Name = "Admin",
                            Password = "5dj3bhWCfxuHmONkBdvFrA==",
                            Position = "lol",
                            Salt = "91ed90df-3289-4fdf-a927-024b24bea8b7",
                            Surname = "Adminov"
                        },
                        new
                        {
                            Id = 13213133,
                            Department = "Memes",
                            Email = "user@gmail.com",
                            Name = "User",
                            Password = "u9DAYiHl+liIqRMvuuciBA==",
                            Position = "lol",
                            Salt = "f0e30e73-fac3-4182-8641-ecba862fed69",
                            Surname = "Userov"
                        });
                });

            modelBuilder.Entity("Scheduling.Models.UserPermission", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("PermissionId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "PermissionId");

                    b.HasIndex("PermissionId");

                    b.ToTable("UserPermissions");

                    b.HasData(
                        new
                        {
                            UserId = 1321313,
                            PermissionId = 2
                        },
                        new
                        {
                            UserId = 1321313,
                            PermissionId = 4
                        },
                        new
                        {
                            UserId = 13213133,
                            PermissionId = 3
                        });
                });

            modelBuilder.Entity("Scheduling.Models.VacationRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FinishDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("VacationRequests");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Comment = "I want to see a bober.",
                            FinishDate = new DateTime(2021, 5, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            StartDate = new DateTime(2021, 4, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = "Declined. Declined by PM. Declined by TL.",
                            UserId = 13213133
                        },
                        new
                        {
                            Id = 2,
                            Comment = "I really want to see a bober.",
                            FinishDate = new DateTime(2021, 4, 28, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            StartDate = new DateTime(2021, 4, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = "Declined. Declined by PM. Declined by TL.",
                            UserId = 13213133
                        },
                        new
                        {
                            Id = 3,
                            Comment = "Please, it`s my dream to see a bober.",
                            FinishDate = new DateTime(2021, 4, 29, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            StartDate = new DateTime(2021, 4, 25, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = "Pending consideration...",
                            UserId = 13213133
                        });
                });

            modelBuilder.Entity("Scheduling.Models.User", b =>
                {
                    b.HasOne("Scheduling.Models.Team", null)
                        .WithMany("Users")
                        .HasForeignKey("TeamId");
                });

            modelBuilder.Entity("Scheduling.Models.UserPermission", b =>
                {
                    b.HasOne("Scheduling.Models.Permission", "Permission")
                        .WithMany("UserPermissions")
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Scheduling.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Permission");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Scheduling.Models.VacationRequest", b =>
                {
                    b.HasOne("Scheduling.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Scheduling.Models.Permission", b =>
                {
                    b.Navigation("UserPermissions");
                });

            modelBuilder.Entity("Scheduling.Models.Team", b =>
                {
                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
