﻿using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Http;
using Scheduling.Domain;
using Scheduling.GraphQl.Types;
using Scheduling.Models;
using System.Linq;

namespace Scheduling.GraphQl
{
    public class Querys : ObjectGraphType
    {
        public Querys(IHttpContextAccessor httpContext, DataBaseRepository dataBaseRepository)
        {

            Name = "Query";
            Field<UserType>(
                "GetCurrentUser",
                arguments: null,
                resolve: context =>
                {
                    var id = int.Parse(httpContext.HttpContext.User.Claims
                        .First(claim => claim.Type == "Id").Value);

                    return dataBaseRepository.Get(id);
                }
            ).AuthorizeWith("Authenticated");


            Field<ListGraphType<TeamType>>(
                "GetTeams",
                arguments: null,
                resolve: context =>
                {
                    return dataBaseRepository.GetListOfAvailableTeams();
                },
                description: "Get list of available teams."
            ).AuthorizeWith(PermissionName.UserManagement.ToString());

            Field<ListGraphType<UserType>>(
                "GetTeamUsers",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "TeamId", Description = "Team id." }
                ),
                resolve: context =>
                {
                    int teamId = context.GetArgument<int>("TeamId");
                    return dataBaseRepository.GetTeamUsers(teamId);
                }

            ).AuthorizeWith("Authenticated");

            Field<ListGraphType<PermissionType>>(
                "GetAllPermissions",
                arguments: null,
                resolve: context =>
                {
                    return dataBaseRepository.GetAllPermissions();
                }
            ).AuthorizeWith(PermissionName.UserManagement.ToString());

            Field<ListGraphType<VacationRequestType>>(
                "GetCurrentUserRequests",
                arguments: null,
                resolve: context =>
                {
                    var id = int.Parse(httpContext.HttpContext.User.Claims
                        .First(claim => claim.Type == "Id").Value);
                    return dataBaseRepository.GetUserRequests(id);
                }
            ).AuthorizeWith("Authenticated");

            Field<ListGraphType<UserType>>(
                "GetUsers",
                "Get users according to you permissions",
                arguments: null,
                resolve: context => dataBaseRepository.GetUsersWithCopmutedProps()
            ).AuthorizeWith(PermissionName.UserManagement.ToString());

        }
    }
}
