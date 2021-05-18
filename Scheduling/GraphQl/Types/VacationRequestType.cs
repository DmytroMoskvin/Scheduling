using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Scheduling.Models;

namespace Scheduling.GraphQl.Types
{
    public class VacationRequestType : ObjectGraphType<VacationRequest>
    {
        public VacationRequestType()
        {
            Name = "VacationRequest";

            Description = "VacationRequest info";

            Field(vacationRequest => vacationRequest.Id).Description("VacationRequest id.");

            Field(vacationRequest => vacationRequest.UserId).Description("VacationRequest user id.");

            Field(vacationRequest => vacationRequest.UserName).Description("VacationRequest user name.");

            Field(vacationRequest => vacationRequest.StartDate).Description("VacationRequest start date.");

            Field(vacationRequest => vacationRequest.FinishDate).Description("VacationRequest finish date.");

            Field(vacationRequest => vacationRequest.Comment).Description("VacationRequest comment.");

            Field<StringGraphType>("Status",
                resolve: context => ((VacationRequest)context.Source).Status.ToString());
        }
    }
}
