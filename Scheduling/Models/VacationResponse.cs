using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class VacationResponse
    {
        public int Id { get; set; }
        public int RequestId { get; set; }
        public int ResponderId { get; set; }
        public bool Response { get; set; }
        public string Comment { get; set; }
        [NotMapped]
        public string ResponderName { get; set; }
        public VacationResponse()
        {

        }
    }
}
