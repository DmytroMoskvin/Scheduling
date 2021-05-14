using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Scheduling.Models;

namespace Scheduling.GraphQl.Types
{
    public class VacationResponseType : ObjectGraphType<VacationResponse>
    {
        public VacationResponseType()
        {
            Name = "VacationResponse";
            Description = "VacationResponse info";

            Field(vacationResponse => vacationResponse.Id).Description("VacationResponse id.");
            Field(vacationResponse => vacationResponse.RequestId).Description("VacationRequest id.");
            Field(vacationResponse => vacationResponse.ResponderId).Description("Responder id.");
            Field(vacationResponse => vacationResponse.Response).Description("Responder`s response");
            Field(vacationResponse => vacationResponse.Comment).Description("Responder`s comment.");
            Field(vacationResponse => vacationResponse.ResponderName).Description("Responder`s name.");
        }
    }
}
