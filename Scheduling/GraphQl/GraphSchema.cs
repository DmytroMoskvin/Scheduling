using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using Scheduling.GraphQl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.GraphQl
{
    public class GraphSchema : Schema
    {
        public GraphSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<Queries>();
            Mutation = provider.GetRequiredService<Mutations>();
        }
    }
}
