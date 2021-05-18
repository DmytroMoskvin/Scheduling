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
    public class CalendarEventQuery
    {
        public CalendarEventQuery(Queries queries, IServiceProvider serviceProvider)
        {
            var httpContext = serviceProvider.GetRequiredService<IHttpContextAccessor>();
            var dataBaseRepository = serviceProvider.GetRequiredService<DataBaseRepository>();
            var calendarEventRepository = serviceProvider.GetRequiredService<CalendarEventRepository>();

            queries.Field<ListGraphType<CalendarEventType>>(
                "GetCurrentUserEvents",
                arguments: null,
                resolve: context =>
                {
                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
                    User user = dataBaseRepository.Get(email);
                    int id = user.Id;
                    return calendarEventRepository.GetUserEvents(id);
                }
            ).AuthorizeWith("Authenticated");
        }
    }
}
