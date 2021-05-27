using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Scheduling.Models.Responses;

namespace Scheduling.GraphQl.Types.Responses
{
    public class GraphQlResponseType : ObjectGraphType<GraphQlResponse>
    {
        public GraphQlResponseType()
        {
            Name = "Response";

            Field(it => it.Success).Description("Whether request succeeded.");

            Field(it => it.Message).Description("Response message.");
        }
    }
}
