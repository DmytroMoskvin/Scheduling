using Scheduling.Models;
using Scheduling.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {

        readonly DBContext Context;

        public DataBaseRepository(DBContext context)
        {
            Context = context;
        }
    }
}
