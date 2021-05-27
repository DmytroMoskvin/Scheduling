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
using Scheduling.GraphQl.Types.Responses;
using Scheduling.Models.Responses;

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
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Password", Description = "User password." }
                ),
                resolve: context =>
                {
                    string email = context.GetArgument<string>("Email");
                    string password = context.GetArgument<string>("Password");

                    return identityService.Authenticate(email, password);
                },
                description: "Returns JWT."
            );

            Field<GraphQlResponseType>(
                "editUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "Id", Description = "User id" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Name", Description = "User name" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Surname", Description = "User surname" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Email", Description = "User email" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Position", Description = "User position" }
                    /*new QueryArgument<NonNullGraphType<ListGraphType<PermissionNameEnum>>> { Name = "Permissions", Description = "User permissions" },
                    new QueryArgument<IntGraphType> { Name = "TeamId", Description = "User team id" }*/
                ),
                resolve: context =>
                {
                    var id = context.GetArgument<int>("Id");
                    var email = context.GetArgument<string>("Email");
                    var name = context.GetArgument<string>("Name");
                    var surname = context.GetArgument<string>("Surname");
                    var position = context.GetArgument<string>("Position");
                    /*var permissions = context.GetArgument<List<PermissionName>>("Permissions");
                    var teamId = context.GetArgument<int>("TeamId");*/

                    var response = new GraphQlResponse();

                    try
                    {
                        dataBaseRepository.EditUser(id, email, name, surname, position);
                        response.Success = true;
                        response.Message = "Success! User is edited.";
                    }
                    catch (Exception e)
                    {
                        response.Success = false;
                        response.Message = "Something went wrong.";
                    }

                    return response;
                }
            );

            Field<BooleanGraphType>(
                "createUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Name", Description = "User name" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Surname", Description = "User surname" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Email", Description = "User email" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Position", Description = "User position" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Department", Description = "User department" },
                    new QueryArgument<NonNullGraphType<ListGraphType<PermissionNameEnum>>> { Name = "Permissions", Description = "User permissions" },
                    new QueryArgument<IntGraphType> { Name = "Team", Description = "User team id" }
                ),
                resolve: context =>
                {
                    var email = context.GetArgument<string>("Email");
                    var name = context.GetArgument<string>("Name");
                    var surname = context.GetArgument<string>("Surname");
                    var position = context.GetArgument<string>("Position");
                    var department = context.GetArgument<string>("Department");
                    var permissions = context.GetArgument<List<PermissionName>>("Permissions");
                    var teamId = context.GetArgument<int>("Team");

                    var password = Guid.NewGuid().ToString();

                    dataBaseRepository
                        .CreateUser(name, surname, email, position, department,
                            password, permissions, teamId);

                    try
                    {
                        emailService.SendEmail(email, password);
                    }
                    catch
                    {
                        return false;
                    }

                    return true;
                }
            ).AuthorizeWith(PermissionName.UserManagement.ToString());

            Field<BooleanGraphType>(
                "removeUser",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "Email", Description = "User email" }),
                resolve: context =>
                {
                    return dataBaseRepository.RemoveUser(context.GetArgument<int>("Id"));
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
