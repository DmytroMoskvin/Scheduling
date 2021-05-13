﻿using System;
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
            foreach (VacationRequest request in requests)
            {
                List<VacationResponse> currentResponses = Context.VacationResponses.Where(r => r.RequestId == request.Id).ToList();
                foreach (VacationResponse response in currentResponses)
                {
                    User responder = Context.Users.Single(u => u.Id == response.ResponderId);
                    response.ResponderName = responder.Name + " " + responder.Surname;
                }
                string status = currentResponses.Count == 3 ? (currentResponses.Where(r => r.Response == false).ToList()).Count > 0 ? "Declined" : "Approved" : "Pending consideration";
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

        public List<VacationRequest> GetRequestsForConsideration(int responderId)
        {
            List<VacationResponse> currentResponses = Context.VacationResponses.Where(r => r.ResponderId == responderId).ToList();
            List<int> idList = new List<int>();
            foreach (VacationResponse response in currentResponses)
                idList.Add(response.RequestId);
            List<VacationRequest> requests = Context.VacationRequests.Where(r => !idList.Contains(r.Id) && r.UserId != responderId).ToList();
            foreach (VacationRequest request in requests)
            {
                string status = "Pending consideration";
                User user = Context.Users.Single(u => u.Id == request.UserId);
                string userName = user.Name + " " + user.Surname;
                request.Status = status;
                request.UserName = userName;
            }
            return requests;
        }

        public List<VacationRequest> GetConsideredRequests(int responderId)
        {
            List<VacationResponse> currentResponses = Context.VacationResponses.Where(r => r.ResponderId == responderId).ToList();
            List<int> idList = new List<int>();
            foreach (VacationResponse response in currentResponses)
                idList.Add(response.RequestId);
            List<VacationRequest> requests = Context.VacationRequests.Where(r => idList.Contains(r.Id) && r.UserId != responderId).ToList();
            foreach (VacationRequest request in requests)
            {
                User user = Context.Users.Single(u => u.Id == request.UserId);
                request.Status = currentResponses.Find(r => r.RequestId == request.Id).Response? "Approved": "Declined";
                request.UserName = user.Name + " " + user.Surname;
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

            User user = Context.Users.Single(u => u.Id == userId);
            vacationRequest.UserName = user.Name + " " + user.Surname;

            return vacationRequest;
        }
        public bool RemoveRequest(int id)
        {
            VacationRequest vacationRequest = Context.VacationRequests.Single(u => u.Id == id);
            Context.VacationRequests.Remove(vacationRequest);
            Context.SaveChanges();
            return true;
        }
        public VacationRequest ConsiderRequest(int requestId, int responderId, bool response, string comment)
        {
            VacationResponse vacationResponse = new VacationResponse()
            {
                RequestId = requestId,
                ResponderId = responderId,
                Response = response,
                Comment = comment,
            };
            Context.VacationResponses.Add(vacationResponse);
            Context.SaveChanges();

            VacationRequest vacationRequest = Context.VacationRequests.Single(r => r.Id == requestId);
            vacationRequest.Status = response ? "Approved" : "Declined";
            User user = Context.Users.Single(u => u.Id == vacationRequest.UserId);
            vacationRequest.UserName = user.Name + " " + user.Surname;
            return vacationRequest;
        }
    }
}
