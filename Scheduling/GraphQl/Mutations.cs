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

            Field<VacationRequestType>(
                "addVacationRequest",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<DateGraphType>> { Name = "StartDate", Description = "Vacation start date" },
                    new QueryArgument<NonNullGraphType<DateGraphType>> { Name = "FinishDate", Description = "Vacation finish date" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Comment", Description = "Comment of the vacation" }
                ),
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);
                    int userId = user.Id;
                    DateTime startDate = context.GetArgument<DateTime>("StartDate");
                    DateTime finishDate = context.GetArgument<DateTime>("FinishDate");
                    string comment = context.GetArgument<string>("Comment");

                    return dataBaseRepository.AddRequest(userId, startDate, finishDate, comment);
                },
                description: "Returns user requests."
            ).AuthorizeWith("Authenticated");

            Field<BooleanGraphType>(
                "removeVacationRequest",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "Id", Description = "Vacation request id" }
                ),
                resolve: context =>
                {
                    int id = context.GetArgument<int>("Id");

                    return dataBaseRepository.RemoveRequest(id);
                },
                description: "Remove result of removing."
            ).AuthorizeWith("Authenticated");

            Field<VacationRequestType>(
                "considerVacationRequest",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "Id", Description = "Vacation request id" },
                    new QueryArgument<NonNullGraphType<BooleanGraphType>> { Name = "Approved", Description = "Approving or derlining request" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Comment", Description = "The reason ob approving or derlining request" }
                ),
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);
                    int responderId = user.Id;
                    int id = context.GetArgument<int>("Id");
                    bool response = context.GetArgument<bool>("Approved");
                    string comment = context.GetArgument<string>("Comment");
                    return dataBaseRepository.ConsiderRequest(id, responderId, response, comment);
                },
                description: "Remove result of removing."
            ).AuthorizeWith("Manager");

            Field<BooleanGraphType>(
                "sendResetPasswordLink",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Email", Description = "User email" }
                ),
                resolve: context =>
                {
                    string email = context.GetArgument<string>("Email");
                    User user = dataBaseRepository.Get(email);
                    if (user == null)
                        return false;

                    string token = identityService.GenerateResetPasswordAccessToken(email);
                    try
                    {
                        emailService.SendRestorePasswordEmail(email, token);
                    }
                    catch
                    {
                        return false;
                    }
                    return true;
                }
            );

            Field<StringGraphType>(
                "resetPassword",    
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Password", Description = "New password to acccount."}
                ),
                resolve: context =>
                {

                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    string token = httpContext.HttpContext.Request.Headers.First(header => header.Key == "Authorization").Value.ToString().Replace("Bearer ", "");
                    Token jwt = dataBaseRepository.GetJWT(token);

                    string password = context.GetArgument<string>("Password");
                    string salt = Guid.NewGuid().ToString();

                    User user = dataBaseRepository.Get(email);

                    if (user.Password == Hashing.GetHashString(password + user.Salt))
                        return "The new password cannot match the current password.";

                    if (jwt == null)
                        return "";

                    dataBaseRepository.RemoveJWT(token);

                    user.Password = Hashing.GetHashString(password + user.Salt);

                    dataBaseRepository.EditUser(user);
                    return "Success";
                }
            ).AuthorizeWith("canResetPassword");

            Field<BooleanGraphType>(
                "checkAccessToResetPasswordPage",
                resolve: context =>
                {
                    string token = httpContext.HttpContext.Request.Headers.First(header => header.Key == "Authorization").Value.ToString().Replace("Bearer ", "");
                    Token jwt = dataBaseRepository.GetJWT(token);

                    if (jwt == null)
                        return false;

                    return true;
                }
            ).AuthorizeWith("canResetPassword");


        Field<TimerHistoryType>(
                "addTimerStartValue",
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);

                    DateTime startTime = DateTime.UtcNow;

                    return dataBaseRepository.AddTimerStartValue(startTime, user.Id);   
                },
                description: "Add start time"

            ).AuthorizeWith("Authenticated");
            Field<TimerHistoryType>(
                "addTimerValue",
                arguments: new QueryArguments(
                    new QueryArgument<DateTimeGraphType> { Name = "StartTime", Description = "Timer started" },
                    new QueryArgument<DateTimeGraphType> { Name = "FinishTime", Description = "Timer finished" }
                ),
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);

                    Nullable<DateTime> startTime = context.GetArgument<Nullable<DateTime>>("StartTime", defaultValue: null);
                    Nullable<DateTime> finishTime = context.GetArgument<Nullable<DateTime>>("FinishTime", defaultValue: null);

                    return dataBaseRepository.AddTimerValue(startTime, finishTime, user.Id);   
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

                    finishTime = (finishTime == null) ? DateTime.UtcNow : finishTime;

                    Nullable<int> id = context.GetArgument<Nullable<int>>("id", defaultValue: null);

                    return dataBaseRepository.EditTimerValue(startTime, finishTime, user.Id, id);
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
