using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Http;
using Scheduling.Domain;
using Scheduling.GraphQl.Types;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace Scheduling.GraphQl
{
    public class CalendarEventMutation 
    {
        public CalendarEventMutation(Mutations mutations, IServiceProvider serviceProvider)
        {
            var httpContext = serviceProvider.GetRequiredService<IHttpContextAccessor>();
            var dataBaseRepository = serviceProvider.GetRequiredService<DataBaseRepository>();
            var calendarEventRepository = serviceProvider.GetRequiredService<CalendarEventRepository>();

            mutations.Field<ListGraphType<CalendarEventType>>(
                "addCalendarEvent",
                arguments: new QueryArguments(
                     new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "WorkDate", Description = "Event start date" },
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "StartWorkTime", Description = "Event start work time" },
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "EndWorkTime", Description = "Event end work time" }
                ),
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();

                    User user = dataBaseRepository.Get(email);

                    int userId = user.Id;


                    DateTime workDate = new DateTime(1970, 1, 1, 0, 0, 0, 0);

                    workDate = workDate.AddSeconds(context.GetArgument<int>("WorkDate"));

                    DateTime startWorkTime = new DateTime(1970, 1, 1, 0, 0, 0, 0);

                    startWorkTime = startWorkTime.AddSeconds(context.GetArgument<int>("StartWorkTime"));

                    DateTime endWorkTime = new DateTime(1970, 1, 1, 0, 0, 0, 0);

                    endWorkTime = endWorkTime.AddSeconds(context.GetArgument<int>("EndWorkTime"));

                    return calendarEventRepository.AddEvent(userId, workDate, startWorkTime, endWorkTime);
                },
                description: "Returns user events."
            ).AuthorizeWith("Authenticated");

            mutations.Field<BooleanGraphType>(
                "removeCalendarEvent",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "Id", Description = "Calendar event id" }
                ),
                resolve: context =>
                {
                    int id = context.GetArgument<int>("Id");

                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();

                    User user = dataBaseRepository.Get(email);

                    int userId = user.Id;

                    calendarEventRepository.RemoveEvents(id, userId);

                    return true;
                },
                description: "Returns user events."
            ).AuthorizeWith("Authenticated");
        }
    }
}
