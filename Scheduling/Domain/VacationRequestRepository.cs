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
        public IEnumerable<VacationRequest> GetUserVacationRequests(int userId)
        {
            return Context.VacationRequests
                .Where(it => it.UserId == userId && (it.StartDate > DateTime.UtcNow || it.FinishDate > DateTime.UtcNow && it.Status == StatusType.Approved))
                .ToList();
        }

        public List<VacationResponse> GetVacationRequestResponses(int requestId)
        {
            return Context.VacationResponses
                .Where(it => it.RequestId == requestId)
                .ToList();
        }

        private void RefreshStatus(VacationRequest vacationRequest)
        {
            var currentResponses = GetVacationRequestResponses(vacationRequest.Id);

            StatusType status = StatusType.PendingConsideration;

            if (currentResponses.Count == 3)
                status = StatusType.Approved;

            if (currentResponses.Any(it => !it.Response))
                status = StatusType.Declined;

            vacationRequest.Status = status;

            Context.VacationRequests.Update(vacationRequest);

            Context.SaveChanges();
        }

        public IEnumerable<VacationRequest> GetRequestsForConsideration(int responderId)
        {
            var idList = Context.VacationResponses
                .Where(it => it.ResponderId == responderId)
                .Select(it => it.RequestId).ToList();

            return Context.VacationRequests
                .Where(it => !idList.Contains(it.Id) && it.UserId != responderId && it.StartDate > DateTime.UtcNow).ToList();
        }

        public IEnumerable<VacationRequest> GetConsideredRequests(int responderId)
        {
            var currentResponses = Context.VacationResponses
                .Where(it => it.ResponderId == responderId);

            var idList = currentResponses
                .Select(it => it.RequestId);

            var vacationRequests = Context.VacationRequests
                .Where(it => idList.Contains(it.Id) && it.UserId != responderId)
                .ToList();

            vacationRequests
                .ForEach(request => request.Status = currentResponses
                .Single(it => it.RequestId == request.Id).Response? StatusType.Approved: StatusType.Declined);

            return vacationRequests;
        }

        public VacationRequest AddRequest(int userId, DateTime startDate, DateTime finishDate, string comment)
        {
            var user = Context.Users
                    .Single(it => it.Id == userId);

            var vacationRequest = new VacationRequest()
            {
                UserId = userId,
                UserName = $"{user.Name} {user.Surname}",
                StartDate = startDate,
                FinishDate = finishDate,
                Comment = comment,
                Status = StatusType.PendingConsideration
            };

            Context.VacationRequests.Add(vacationRequest);

            Context.SaveChanges();

            return vacationRequest;
        }

        public bool RemoveRequest(int id)
        {
            var vacationRequest = Context.VacationRequests
                .Single(it => it.Id == id);

            Context.VacationRequests
                .Remove(vacationRequest);

            Context.SaveChanges();

            return true;
        }

        public VacationRequest ConsiderRequest(int requestId, int responderId, bool response, string comment)
        {
            var responder = Context.Users
                .Single(it => it.Id == responderId);

            var vacationResponse = new VacationResponse()
            {
                RequestId = requestId,
                ResponderId = responderId,

                ResponderName = $"{responder.Name} {responder.Surname}",

                Response = response,
                Comment = comment,
            };

            Context.VacationResponses.Add(vacationResponse);

            Context.SaveChanges();

            var vacationRequest = Context.VacationRequests
                .Single(it => it.Id == requestId);

            RefreshStatus(vacationRequest);

            vacationRequest.Status = response ? StatusType.Approved : StatusType.Declined;

            return vacationRequest;
        }
    }
}
