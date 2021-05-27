using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models.Responses
{
    public interface IGraphQlResponse
    {
        bool Success { get; set; }

        string Message { get; set; }

    }
}
