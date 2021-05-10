using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Models
{
    public class ComputedProps
    {
        public List<string> Permissions { get; set; }
        public List<Team> Teams { get; set; }
        public List<TimerHistory> TimerHistories { get; set; }
        public List<VacationRequest> VacationRequests { get; set; }

        public ComputedProps()
        {

        }
        public void AddPermission(List<Permission> permissions)
        {
            Permissions = new List<string>();
            foreach (Permission permission in permissions)
                Permissions.Add(permission.Name);
        }
        public void AddTimerHistory(List<TimerHistory> timerHistory)
        {
            TimerHistories = new List<TimerHistory>();
            foreach (TimerHistory timerHistoryValue in timerHistory)
            {
                TimerHistories.Add(timerHistoryValue);
            }
        }
        public void AddVacationRequests(List<VacationRequest> vacationRequests)
        {
            VacationRequests = new List<VacationRequest>();
            foreach (VacationRequest vacationRequest in vacationRequests)
            {
                VacationRequests.Add(vacationRequest);
            }
        }
        public void AddTeams(List<Team> teams)
        {
            Teams = new List<Team>();
            foreach (Team team in teams)
            {
                Teams.Add(team);
            }
        }
    }
}
