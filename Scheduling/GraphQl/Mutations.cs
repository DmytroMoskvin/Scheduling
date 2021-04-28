using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Http;
using Scheduling.Domain;
using Scheduling.GraphQl.Types;
using Scheduling.Models;
using Scheduling.Services;
using Scheduling.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl
{
    public class Mutations : ObjectGraphType
    {
        public Mutations(IdentityService identityService, DataBaseRepository dataBaseRepository, EmailService emailService, IHttpContextAccessor httpContext)
        {
            Name = "Mutation";

            Field<StringGraphType>(
                "authentication",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Email", Description = "User email." },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Password", Description = "User password."}
                ),
                resolve: context =>
                {
                    string email = context.GetArgument<string>("Email");
                    string password = context.GetArgument<string>("Password");

                    return identityService.Authenticate(email, password);   
                },
                description: "Returns JWT."
            );

            Field<BooleanGraphType>(
                "createUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Name", Description = "User name"},
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Surname", Description = "User surname"},
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Email", Description = "User email"},
                    new QueryArgument<NonNullGraphType<ListGraphType<StringGraphType>>> { Name = "Permissions", Description = "User permisions"},
                    new QueryArgument<ListGraphType<IntGraphType>> { Name = "Teams", Description = "User teams id"}
                ),
                resolve: context =>
                {
                    string email = context.GetArgument<string>("Email");
                    string name = context.GetArgument<string>("Name");
                    string surname = context.GetArgument<string>("Surname");
                    List<string> permissions = context.GetArgument<List<string>>("Permissions");
                    List<int> teamsId = context.GetArgument<List<int>>("Teams");

                    string password = Guid.NewGuid().ToString();

                    User user = dataBaseRepository.CreateUser(name, surname, email, password, permissions, teamsId);
                    
                    if(user.Email != null)
                    {
                        try
                        {
                            emailService.SendEmail(email, password);
                        }catch 
                        {
                            return false;
                        }
                    }

                    return true;
                }
            ).AuthorizeWith("Manager");

            Field<BooleanGraphType>(
                "RemoveUser",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<StringGraphType>>{ Name = "Email", Description = "User email" }),
                resolve: context =>
                {
                    return dataBaseRepository.RemoveUser(context.GetArgument<string>("Email"));
                }
            );

            Field<ListGraphType<VacationRequestType>>(
                "addVacationRequest",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "UserId", Description = "User id" },
                    new QueryArgument<NonNullGraphType<DateGraphType>> { Name = "StartDate", Description = "Vacation start date" },
                    new QueryArgument<NonNullGraphType<DateGraphType>> { Name = "FinishDate", Description = "Vacation finish date" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Status", Description = "Status of the vacation" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Comment", Description = "Comment of the vacation" }
                ),
                resolve: context =>
                {
                    int userId = context.GetArgument<int>("UserId");
                    DateTime startDate = context.GetArgument<DateTime>("StartDate");
                    DateTime finishDate = context.GetArgument<DateTime>("FinishDate");
                    string status = context.GetArgument<string>("Status");
                    string comment = context.GetArgument<string>("Comment");

                    return dataBaseRepository.AddRequest(userId, startDate, finishDate, status, comment);
                },
                description: "Returns user requests."
            ).AuthorizeWith("Authenticated");

            Field<ListGraphType<VacationRequestType>>(
                "removeVacationRequest",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "Id", Description = "Vacation request id" }
                ),
                resolve: context =>
                {
                    int id = context.GetArgument<int>("Id");

                    return dataBaseRepository.RemoveRequest(id);
                },
                description: "Returns user requests."
            ).AuthorizeWith("Authenticated");

            Field<TimerHistoryType>(
                "addTimerStartValue",
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);

                    DateTime startTime = DateTime.Now;

                    return dataBaseRepository.AddTimerStartValue(startTime, user.Id);   
                },
                description: "Add start time"

            ).AuthorizeWith("Authenticated");


            Field<TimerHistoryType>(
                "editTimerFinishValue",
                arguments: new QueryArguments(
                    new QueryArgument<DateTimeGraphType> { Name = "StartTime", Description = "Timer started" },
                    new QueryArgument<DateTimeGraphType> { Name = "FinishTime", Description = "Timer finished" },
                    new QueryArgument<IntGraphType> { Name = "id", Description = "Edit Timer finished" }
                ),
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);

                    Nullable<DateTime> startTime = context.GetArgument<Nullable<DateTime>>("StartTime", defaultValue: null);
                    Nullable<DateTime> finishTime = context.GetArgument<Nullable<DateTime>>("FinishTime", defaultValue: null);


                    Nullable<int> id = context.GetArgument<Nullable<int>>("id", defaultValue: null);

                    return dataBaseRepository.EditTimerValue(startTime, finishTime = DateTime.Now, user.Id, id);
                },
                description: "Update value: added finish time"
            ).AuthorizeWith("Authenticated");


            Field<TimerHistoryType>(
                "deleteTimerFinishValue",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id", Description = "Edit Timer finished" }
                ),
                resolve: context =>
                {

                    int id = context.GetArgument<int>("id");

                    return dataBaseRepository.DeteleTimerValue(id);
                },
                description: "Update value: added finish time"
            );
        }
    }
}
