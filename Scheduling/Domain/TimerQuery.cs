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
using Scheduling.GraphQl;

namespace Scheduling.Domain
{
    public class TimerQuery
    {
        public TimerQuery(Querys queries, IServiceProvider serviceProvider)
        {
        var httpContext = serviceProvider.GetRequiredService<IHttpContextAccessor>();
        var dataBaseRepository = serviceProvider.GetRequiredService<DataBaseRepository>();
        var timerRepository = serviceProvider.GetRequiredService<TimerRepository>();

        queries.Field<UserType>(
            "GetCurrentUserTimerHistory",
            arguments: new QueryArguments(
                new QueryArgument<DateGraphType> { Name = "CalendarDay", Description = "Selected day" }
                ),
            resolve: context =>
            {
                string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                User user = dataBaseRepository.Get(email);


                System.DateTime? selectedMonth = context.GetArgument<System.DateTime?>("CalendarDay");
                DateTime dt;
                if (selectedMonth.HasValue)
                {
                    var a = timerRepository.GetTimerHistory(user.Id, selectedMonth);

                    user.ComputedProps.AddTimerHistory(new List<TimerHistory>(a.OfType<TimerHistory>()));

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
                return user;
            }
        ).AuthorizeWith("Authenticated");


        queries.FieldAsync<ListGraphType<TimerHistoryType>, IReadOnlyCollection<TimerHistory>>(
            "GetTimerHistories",
            resolve: ctx =>
            {
                return timerRepository.GetTimerHistory();
            }
        ).AuthorizeWith("Authenticated");
    }
    }
}
