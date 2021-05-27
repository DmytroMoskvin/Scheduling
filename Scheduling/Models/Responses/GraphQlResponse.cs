using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models.Responses
{
    public class GraphQlResponse : IGraphQlResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
