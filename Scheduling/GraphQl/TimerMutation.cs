using Microsoft.AspNetCore.Http;
using Scheduling.Domain;
using Scheduling.GraphQl.Types;
using Scheduling.Models;
using Scheduling.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using GraphQL;
using GraphQL.Types;

namespace Scheduling.GraphQl
{
    public class TimerMutation
    {
        public TimerMutation(Mutations mutations, IServiceProvider serviceProvider)
        {
            var httpContext = serviceProvider.GetRequiredService<IHttpContextAccessor>();
            var dataBaseRepository = serviceProvider.GetRequiredService<DataBaseRepository>();
            var timerRepository = serviceProvider.GetRequiredService<TimerRepository>();

            mutations.Field<TimerHistoryType>(
                "addTimerStartValue",
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);

                    DateTime startTime = DateTime.UtcNow;

                    return timerRepository.AddTimerStartValue(startTime, user.Id);
                },
                description: "Add start time"

            ).AuthorizeWith("Authenticated");


            mutations.Field<TimerHistoryType>(
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

                        return timerRepository.AddTimerValue(startTime, finishTime, user.Id);
                    },
                    description: "Add start time"

                ).AuthorizeWith("Authenticated");


            mutations.Field<TimerHistoryType>(
                "editTimerValue",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<DateTimeGraphType>> { Name = "StartTime", Description = "Timer started" },
                    new QueryArgument<NonNullGraphType<DateTimeGraphType>> { Name = "FinishTime", Description = "Timer finished" },
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id", Description = "Edit Timer finished" }
                ),
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();

                    User user = dataBaseRepository.Get(email);

                    DateTime startTime = context.GetArgument<DateTime>("StartTime");
                    DateTime finishTime = context.GetArgument<DateTime>("FinishTime");

                    finishTime = (finishTime == null) ? DateTime.UtcNow : finishTime;

                    int id = context.GetArgument<int>("id");

                    return timerRepository.EditTimerValue(startTime, finishTime, user.Id, id);
                },
                description: "Update value: added finish time"
            ).AuthorizeWith("Authenticated");

            mutations.Field<TimerHistoryType>(
                "addTimerFinishValue",
                arguments: new QueryArguments(
                ),
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();

                    User user = dataBaseRepository.Get(email);

                    return timerRepository.AddTimerFinishValue(user.Id);
                },
                description: "Update value: added finish time"
            ).AuthorizeWith("Authenticated");


            mutations.Field<TimerHistoryType>(
                "deleteTimerFinishValue",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id", Description = "Edit Timer finished" }
                ),
                resolve: context =>
                {

                    int id = context.GetArgument<int>("id");

                    return timerRepository.DeteleTimerValue(id);
                },
                description: "Update value: added finish time"
            );



        }
    }
}
