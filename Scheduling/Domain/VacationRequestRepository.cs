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
        //public List<VacationRequestInfo> GetUserVacationRequests(int userId)
        //{
        //    List<VacationRequestInfo> vacationRequestInfos = new List<VacationRequestInfo>();
        //    List<VacationRequest> requests = Context.VacationRequests.Where(r => r.UserId == userId).ToList();
        //    foreach (VacationRequest request in requests) {
        //        List<VacationResponse> currentResponses = Context.VacationResponses.Where(r => r.RequestId == request.Id).ToList();
        //        foreach (VacationResponse response in currentResponses)
        //        {
        //            User responder = Context.Users.Single(u => u.Id == response.ResponderId);
        //            response.ResponderName = responder.Name + " " + responder.Surname;
        //        }
        //        string status = currentResponses.Count > 0 ? (currentResponses.Where(r => r.Response == false).ToList()).Count > 0 ? "Declined" : "Approved" : "Pending conversation...";
        //        User user = Context.Users.Single(u => u.Id == userId);
        //        string userName = user.Name + " " + user.Surname;
        //        request.Status = status;
        //        request.UserName = userName;
        //        vacationRequestInfos.Add(new VacationRequestInfo(request, currentResponses));
        //    }
        //    return vacationRequestInfos;
        //}

        public List<VacationRequest> GetUserVacationRequests(int userId)
        {
            List<VacationRequest> requests = Context.VacationRequests.Where(r => r.UserId == userId).ToList();
            foreach (VacationRequest request in requests)
            {
                List<VacationResponse> currentResponses = Context.VacationResponses.Where(r => r.RequestId == request.Id).ToList();
                foreach (VacationResponse response in currentResponses)
                {
                    User responder = Context.Users.Single(u => u.Id == response.ResponderId);
                    response.ResponderName = responder.Name + " " + responder.Surname;
                }
                string status = currentResponses.Count > 0 ? (currentResponses.Where(r => r.Response == false).ToList()).Count > 0 ? "Declined" : "Approved" : "Pending consideration";
                User user = Context.Users.Single(u => u.Id == userId);
                string userName = user.Name + " " + user.Surname;
                request.Status = status;
                request.UserName = userName;
            }
            return requests;
        }

        public List<VacationResponse> GetVacationRequestResponses(int requestId)
        {
            VacationRequest request = Context.VacationRequests.Single(r => r.Id == requestId);
            List<VacationResponse> currentResponses = Context.VacationResponses.Where(r => r.RequestId == request.Id).ToList();
            foreach (VacationResponse response in currentResponses)
            {
                User responder = Context.Users.Single(u => u.Id == response.ResponderId);
                response.ResponderName = responder.Name + " " + responder.Surname;
            }
            return currentResponses;
        }

        public List<VacationRequest> GetAllVacationRequests()
        {
            List<VacationRequest> requests = Context.VacationRequests.ToList();
            foreach (VacationRequest request in requests)
            {
                List<VacationResponse> currentResponses = Context.VacationResponses.Where(r => r.RequestId == request.Id).ToList();
                foreach (VacationResponse response in currentResponses)
                {
                    User responder = Context.Users.Single(u => u.Id == response.ResponderId);
                    response.ResponderName = responder.Name + " " + responder.Surname;
                }
                string status = currentResponses.Count > 0 ? (currentResponses.Where(r => r.Response == false).ToList()).Count > 0 ? "Declined" : "Approved" : "Pending consideration";
                User user = Context.Users.Single(u => u.Id == request.UserId);
                string userName = user.Name + " " + user.Surname;
                request.Status = status;
                request.UserName = userName;
            }
            return requests;
        }
        public VacationRequest AddRequest(int userId, DateTime startDate, DateTime finishDate, string comment)
        {
            VacationRequest vacationRequest = new VacationRequest()
            {
                UserId = userId,
                StartDate = startDate,
                FinishDate = finishDate,
                Comment = comment,
                Status = "Pending consideration"
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
            Context.SaveChanges();
            return vacationRequest;
        }
    }
}
