using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Scheduling.Models;

namespace Scheduling.GraphQl.Types
{
    public class VacationRequestInfoType : ObjectGraphType<VacationRequestInfo>
    {
        public VacationRequestInfoType()
        {
            Name = "VacationRequestInfoType";
            Description = "VacationRequest info";

            Field<VacationRequestType>(nameof(VacationRequestInfo.VacationRequest));
            Field<ListGraphType<VacationResponseType>>(nameof(VacationRequestInfo.VacationResponses));
        }
    }
}
