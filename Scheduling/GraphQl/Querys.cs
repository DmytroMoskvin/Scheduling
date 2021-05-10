using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Http;
using Scheduling.Domain;
using Scheduling.GraphQl.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
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
                arguments: new QueryArguments(
                    new QueryArgument<DateGraphType> { Name = "CalendarDay", Description = "Selected day" }
                    ),
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);

                    user.ComputedProps = new ComputedProps();
                    user.ComputedProps.AddPermission(dataBaseRepository.GetPermission(user.Id));
                    user.ComputedProps.AddTeams(dataBaseRepository.GetUserTeams(user.Id));


                    System.DateTime? selectedDay = context.GetArgument<System.DateTime?>("CalendarDay");
                    if (selectedDay.HasValue)
                    {
                        var a = dataBaseRepository.GetTimerHistory(user.Id)
                            .Where(r => r.StartTime.Value.ToShortDateString() == selectedDay.Value.Date.ToShortDateString());

                        user.ComputedProps.AddTimerHistory(new List<TimerHistory>(a.OfType<TimerHistory>()));

                    }
                    else
                        user.ComputedProps.AddTimerHistory(dataBaseRepository.GetTimerHistory(user.Id));

                    return user;
                }
            ).AuthorizeWith("Authenticated");

            Field<ListGraphType<UserType>>(
                "GetAllUsers",
                arguments: null,
                resolve: context =>
                {
                    return dataBaseRepository.Get();
                }
            ).AuthorizeWith("Manager");

            Field<ListGraphType<TeamType>>(
                "GetTeams",
                arguments: null,
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);
                    return dataBaseRepository.GetListOfAvailableTeams(user.Id);
                },
                description: "Get list of available teams."
            ).AuthorizeWith("Manager");


            Field<ListGraphType<TeamType>>(
                "GetUserTeams",
                arguments: null,
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);
                    return dataBaseRepository.GetUserTeams(user.Id);
                }
            ).AuthorizeWith("Authenticated");

            Field<ListGraphType<UserType>>(
                "GetTeamUsers",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "TeamId", Description = "Team id."}    
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
            ).AuthorizeWith("Manager");

            Field<ListGraphType<VacationRequestType>>(
                "GetCurrentUserRequests",
                arguments: null,
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);
                    int id = user.Id;
                    return dataBaseRepository.GetUserVacationRequests(user.Id);
                }
            ).AuthorizeWith("Authenticated");

            FieldAsync<ListGraphType<TimerHistoryType>, IReadOnlyCollection<TimerHistory>>(
                "GetTimerHistories",
                resolve: ctx =>
                {
                    return dataBaseRepository.GetTimerHistory();
                }).AuthorizeWith("Authenticated");

            Field<UserType>(
                "GetCurrentUserId",
                arguments: null,
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);
                    return user;
                }
            ).AuthorizeWith("Authenticated");

            Field<ListGraphType<UserType>>(
                "GetUsersOnVacation",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<DateTimeGraphType>> { Name="Date" }
                ),
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);

                    user.ComputedProps = new ComputedProps();
                    user.ComputedProps.AddTeams(dataBaseRepository.GetUserTeams(user.Id));

                    DateTime DateToCheck = context.GetArgument<DateTime>("Date");

                    List<User> teammatesOnVacation = new List<User>();

                    user.ComputedProps.Teams.ForEach((team) => {
                        dataBaseRepository.GetTeamUsers(team.Id).ForEach((user) => {
                            dataBaseRepository.GetUserVacationRequests(user.Id).ForEach((request) => {
                                if(request.FinishDate >= DateToCheck && request.StartDate <= DateToCheck)
                                {
                                    if (teammatesOnVacation.Contains(user))
                                        return;
                                    teammatesOnVacation.Add(user);
                                }
                            });
                        });
                    });

                    return teammatesOnVacation;
                }
            ).AuthorizeWith("Authenticated");
        }
    }
}
