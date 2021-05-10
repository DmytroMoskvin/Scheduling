using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduling.Models;
using Scheduling.Utils;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {
        public List<VacationRequest> GetUserVacationRequests(int userId)
        {
            List<VacationRequest> requests = Context.VacationRequests.Where(r => r.UserId == userId).ToList();
            return requests;
        }
        public List<VacationRequest> GetAllVacationRequests()
        {
            return Context.VacationRequests.ToList();
        }
        public VacationRequest AddRequest(int userId, DateTime startDate, DateTime finishDate, string status, string comment)
        {
            VacationRequest vacationRequest = new VacationRequest()
            {
                UserId = userId,
                StartDate = startDate,
                FinishDate = finishDate,
                Status = status,
                Comment = comment,
            };

            Context.VacationRequests.Add(vacationRequest);
            Context.SaveChanges();

            return vacationRequest;
        }
        public bool RemoveRequest(int id)
        {
            VacationRequest vacationRequest = Context.VacationRequests.Single(u => u.Id == id);
            Context.VacationRequests.Remove(vacationRequest);
            Context.SaveChanges();
            return true;
        }
        public VacationRequest ConsiderRequest(int id, bool approved, string name, string comment)
        {
            VacationRequest vacationRequest = Context.VacationRequests.Single(u => u.Id == id);
            vacationRequest.Status = (approved ? "Approved by " : "Declided by ") + name + ". " + comment;
            Context.SaveChanges();
            return vacationRequest;
        }
    }
}
