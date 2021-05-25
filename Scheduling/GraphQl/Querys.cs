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
        public Querys(IHttpContextAccessor httpContext, DataBaseRepository dataBaseRepository, TimerRepository timerRepository, IServiceProvider serviceProvider)
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


                    System.DateTime? selectedMonth = context.GetArgument<System.DateTime?>("CalendarDay");
<<<<<<< HEAD

                    
=======
                    DateTime dt;
>>>>>>> 0d85fe4dde3033c66fa1ba6246cf24c6a1c3c12d
                    if (selectedMonth.HasValue)
                    {
                        var a = timerRepository.GetTimerHistory(user.Id, selectedMonth);

                        user.ComputedProps.AddTimerHistory(new List<TimerHistory>(a.OfType<TimerHistory>()));
<<<<<<< HEAD
                    }
                    else
                    {
                        user.ComputedProps.AddTimerHistory(dataBaseRepository.GetTimerHistory(user.Id));
                    }


                    user.ComputedProps.TotalWorkTime = dataBaseRepository.GetTimeByMonth(user.Id, DateTime.Now); ;

=======

                        dt = new DateTime(selectedMonth.Value.Year, selectedMonth.Value.Month, selectedMonth.Value.Day, selectedMonth.Value.Hour, 0, 0);
                    }
                    else
                    {
                        user.ComputedProps.AddTimerHistory(timerRepository.GetTimerHistory(user.Id));
                        dt = DateTime.Now;
                    }
                    int? b = timerRepository.GetTimeByMonth(user.Id, dt);
                    var g = timerRepository.GetTimesByMonth(user.Id, dt);
                    int? c = timerRepository.GetTimeByDay(user.Id, dt);
                    var j = timerRepository.GetTimesByDay(user.Id, dt);

                    Console.WriteLine(b);
>>>>>>> 0d85fe4dde3033c66fa1ba6246cf24c6a1c3c12d
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
                    return dataBaseRepository.GetUserRequests(user.Id);
                }
            ).AuthorizeWith("Authenticated");


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
                            dataBaseRepository.GetUserRequests(user.Id).ForEach((request) => {
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

            new TimerQuery(this, serviceProvider);
        }
    }
}
