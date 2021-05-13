using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class VacationRequestInfo
    {
        public VacationRequest VacationRequest { get; set; }
        public List<VacationResponse> VacationResponses { get; set; }
        public VacationRequestInfo()
        {

        }
        public VacationRequestInfo(VacationRequest vacationRequest, List<VacationResponse> vacationResponses)
        {
            VacationRequest = vacationRequest;
            VacationResponses = vacationResponses;
        }
    }
}
