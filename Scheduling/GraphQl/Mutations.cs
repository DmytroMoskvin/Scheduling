using GraphQL;
using GraphQL.Types;
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
        public Mutations(IdentityService identityService, DataBaseRepository dataBaseRepository, EmailService emailService)
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

            /*Field<BooleanGraphType>(
                "editUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Original email", Description = "User original email"},
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Name", Description = "User name" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Surname", Description = "User surname" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Email", Description = "User email" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Position", Description = "User position" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Password", Description = "User password" },
                    new QueryArgument<NonNullGraphType<ListGraphType<StringGraphType>>> { Name = "Permissions", Description = "User permisions" },
                    new QueryArgument<ListGraphType<IntGraphType>> { Name = "Teams", Description = "User teams id" }
                ),
                resolve: context =>
                {
                    string originalEmail = context.GetArgument<string>("Original email");
                    string email = context.GetArgument<string>("Email");
                    string name = context.GetArgument<string>("Name");
                    string surname = context.GetArgument<string>("Surname");
                    string position = context.GetArgument<string>("Position");
                    string password = context.GetArgument<string>("Password");
                    List<string> permissions = context.GetArgument<List<string>>("Permissions");
                    List<int> teamsId = context.GetArgument<List<int>>("Teams");

                    bool isSuccesful = dataBaseRepository.EditUser(originalEmail, name, surname, email, position, password, permissions, teamsId);

                    *//*if(user.Email != null)
                    {
                        try
                        {
                            emailService.SendEmail(email, password);
                        }catch 
                        {
                            return false;
                        }
                    }*//*

                    return true;
                }
            );*/

            Field<BooleanGraphType>(
                "createUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Name", Description = "User name" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Surname", Description = "User surname" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Email", Description = "User email" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Position", Description = "User position" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Password", Description = "User password" },
                    new QueryArgument<NonNullGraphType<ListGraphType<StringGraphType>>> { Name = "Permissions", Description = "User permisions" },
                    new QueryArgument<ListGraphType<IntGraphType>> { Name = "Teams", Description = "User teams id" }
                ),
                resolve: context =>
                {
                    string email = context.GetArgument<string>("Email");
                    string name = context.GetArgument<string>("Name");
                    string surname = context.GetArgument<string>("Surname");
                    string position = context.GetArgument<string>("Position");
                    string password = context.GetArgument<string>("Password");
                    List<string> permissions = context.GetArgument<List<string>>("Permissions");
                    List<int> teamsId = context.GetArgument<List<int>>("Teams");

                    User user = dataBaseRepository.CreateUser(name, surname, email, position, password, permissions, teamsId);
                    
                    /*if(user.Email != null)
                    {
                        try
                        {
                            emailService.SendEmail(email, password);
                        }catch 
                        {
                            return false;
                        }
                    }*/

                    return true;
                }
            ).AuthorizeWith("Authenticated");

            Field<BooleanGraphType>(
                "removeUser",
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
        }
    }
}
