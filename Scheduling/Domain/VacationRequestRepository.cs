using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduling.Models;
using Scheduling.Utils;
using static Scheduling.Models.VacationRequest;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {
        private void SetComputedData(VacationRequest request, int userId, StatusType status)
        {
            var user = Context.Users
                .Single(it => it.Id == userId);

            request.Status = status;
            request.UserName = $"{user.Name} {user.Surname}";
        }

        private void SetResponderName(VacationResponse response)
        {
            var responder = Context.Users
                .Single(it => it.Id == response.ResponderId);

            response.ResponderName = $"{responder.Name} {responder.Surname}";
        }

        public IEnumerable<VacationRequest> GetUserVacationRequests(int userId)
        {
            var requests = Context.VacationRequests
                .Where(it => it.UserId == userId && it.FinishDate > DateTime.UtcNow)
                .ToList();

            requests.ForEach(request =>
            {
                var currentResponses = Context.VacationResponses
                    .Where(r => r.RequestId == request.Id)
                    .ToList();

                currentResponses.ForEach(it =>
                {
                    var responder = Context.Users
                        .Single(u => u.Id == it.ResponderId);

                    it.ResponderName = $"{responder.Name} {responder.Surname}";
                });

                var status = currentResponses.Count == 3 ?
                    currentResponses.Where(r => r.Response == false).Any() ?
                    StatusType.Declined : StatusType.Approved : StatusType.PendingConsideration;

                SetComputedData(request, userId, status);
            });

            return requests;
        }

        public IEnumerable<VacationResponse> GetVacationRequestResponses(int requestId)
        {
            var request = Context.VacationRequests
                .Single(r => r.Id == requestId);

            var currentResponses = Context.VacationResponses
                .Where(r => r.RequestId == request.Id)
                .ToList();

            currentResponses
                .ForEach(it => SetResponderName(it));

            return currentResponses;
        }

        public IEnumerable<VacationRequest> GetRequestsForConsideration(int responderId)
        {
            var idList = Context.VacationResponses
                .Where(r => r.ResponderId == responderId)
                .Select(r => r.RequestId);

            var requests = Context.VacationRequests
                .Where(r => !idList.Contains(r.Id) && r.UserId != responderId && r.StartDate > DateTime.UtcNow).ToList();

            requests
                .ForEach(request =>
                {
                    var status = StatusType.PendingConsideration;

                    SetComputedData(request, request.UserId, status);
                });

            return requests;
        }

        public IEnumerable<VacationRequest> GetConsideredRequests(int responderId)
        {
            var currentResponses = Context.VacationResponses
                .Where(r => r.ResponderId == responderId)
                .ToList();

            var idList = currentResponses
                .Select(r => r.RequestId);

            var requests = Context.VacationRequests
                .Where(r => idList.Contains(r.Id) && r.UserId != responderId)
                .ToList();

            requests
                .ForEach(request =>
                {
                    var status = currentResponses
                        .Find(r => r.RequestId == request.Id).Response ? StatusType.Approved : StatusType.Declined;

                    SetComputedData(request, request.UserId, status);
                });

            return requests;
        }

        public VacationRequest AddRequest(int userId, DateTime startDate, DateTime finishDate, string comment)
        {
            var vacationRequest = new VacationRequest()
            {
                UserId = userId,
                StartDate = startDate,
                FinishDate = finishDate,
                Comment = comment
            };

            Context.VacationRequests.Add(vacationRequest);

            Context.SaveChanges();

            var status = StatusType.PendingConsideration;

            SetComputedData(vacationRequest, userId, status);

            return vacationRequest;
        }
        public bool RemoveRequest(int id)
        {
            var vacationRequest = Context.VacationRequests
                .Single(u => u.Id == id);

            Context.VacationRequests
                .Remove(vacationRequest);

            Context.SaveChanges();

            return true;
        }
        public VacationRequest ConsiderRequest(int requestId, int responderId, bool response, string comment)
        {
            var vacationResponse = new VacationResponse()
            {
                RequestId = requestId,
                ResponderId = responderId,
                Response = response,
                Comment = comment,
            };

            Context.VacationResponses.Add(vacationResponse);

            Context.SaveChanges();

            var vacationRequest = Context.VacationRequests
                .Single(r => r.Id == requestId);

            var status = response ? StatusType.Approved : StatusType.Declined;

            SetComputedData(vacationRequest, vacationRequest.UserId, status);

            return vacationRequest;
        }
    }
}
