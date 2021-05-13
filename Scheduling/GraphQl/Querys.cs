using GraphQL;
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
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);

                    /*user.ComputedProps = new ComputedProps();
                    user.ComputedProps.AddPermission(dataBaseRepository.GetPermissions(user.Id));
                    user.ComputedProps.Teams = dataBaseRepository.GetUserTeams(user.Id);*/

                    return user;
                }
            ).AuthorizeWith("Authenticated");


            Field<ListGraphType<TeamType>>(
                "GetTeams",
                arguments: null,
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);
                    return dataBaseRepository.GetListOfAvailableTeams();
                },
                description: "Get list of available teams."
            ).AuthorizeWith(PermissionName.UserManagement.ToString());


            /*Field<ListGraphType<TeamType>>(
                "GetUserTeams",
                arguments: null,
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);
                    return dataBaseRepository.GetUserTeams(user.Id);
                }
            ).AuthorizeWith("Authenticated");*/

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

            Field<ListGraphType<StringGraphType>>(
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
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);
                    int id = user.Id;
                    return dataBaseRepository.GetUserRequests(user.Id);
                }
            ).AuthorizeWith("Authenticated");

            Field<ListGraphType<UserType>>(
                "GetUsers",
                "Get users according to you permissions",
                arguments: null,
                resolve: context =>
                {
                   /* string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);
                    int id = user.Id;*/
                    return dataBaseRepository.Get();
                }

            ).AuthorizeWith(PermissionName.UserManagement.ToString());

        }
    }
}
