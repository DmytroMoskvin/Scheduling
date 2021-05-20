//using Microsoft.AspNetCore.Http;
//using Scheduling.Domain;
//using Scheduling.GraphQl.Types;
//using Scheduling.Models;
//using Scheduling.Services;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.Extensions.DependencyInjection;

//namespace Scheduling.GraphQl
//{
//    public class TimerMutation 
//    {
//        public TimerMutation(Mutations mutations, IServiceProvider serviceProvider)
//        {
//            var httpContext = serviceProvider.GetRequiredService<IHttpContextAccessor>();
//            mutations.Field<TimerHistoryType>(
//                "addTimerStartValue",
//                resolve: context =>
//                {
//                    string email = httpContext.HttpContext.User.Claims.First(claim => claim.Type == "Email").Value.ToString();
//                    User user = dataBaseRepository.Get(email);

//                    DateTime startTime = DateTime.UtcNow;

//                    return dataBaseRepository.AddTimerStartValue(startTime, user.Id);
//                },
//                description: "Add start time"

//            ).AuthorizeWith("Authenticated");
//        }
//    }
//}
