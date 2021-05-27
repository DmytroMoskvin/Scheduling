using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class VacationRequest
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime FinishDate { get; set; }

        public string Comment { get; set; }

        public StatusType Status { get; set; }


        public enum StatusType
        {
            PendingConsideration,
            Approved,
            Declined
        }

        public VacationRequest()
        {

        }
    }
}
