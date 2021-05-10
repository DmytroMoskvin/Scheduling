using Microsoft.EntityFrameworkCore;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Domain
{
    public partial class DataBaseRepository
    {
        public async Task<IReadOnlyCollection<TimerHistory>> GetTimerHistory()
        {
            return await Context.TimerHistories.AsNoTracking().ToListAsync();
        }
        public List<TimerHistory> GetTimerHistory(int userId)
        {
            //return Context.TimerHistory.ToList();

            User user = Context.Users.FirstOrDefault(user => user.Id == userId);

            if (user == null)
                return new List<TimerHistory>();

            List<UserTimerHistory> userTimerHistories = Context.UserTimerHistories.Where(timerHistory => timerHistory.UserId == user.Id).ToList<UserTimerHistory>();

            List<TimerHistory> timerHistories = new List<TimerHistory>();

            foreach (UserTimerHistory userTimerHistory in userTimerHistories)
            {
                timerHistories.Add(Context.TimerHistories.SingleOrDefault(timerHistory => timerHistory.Id == userTimerHistory.TimerHistoryId));
            }
            return timerHistories;
        }
        public TimerHistory AddTimerStartValue(DateTime startTime, int userId)
        {
            var timerValues = new TimerHistory()
            {
                StartTime = startTime
            };
            Context.Add(timerValues);
            Context.SaveChanges();

            var idTimerHistory = (Context.TimerHistories.Find(timerValues.Id));

            var userTimerValue = new UserTimerHistory()
            {
                TimerHistoryId = idTimerHistory.Id,
                UserId = userId
            };

            Context.UserTimerHistories.Add(userTimerValue);

            Context.SaveChanges();

            return timerValues;
        }
        public TimerHistory AddTimerValue(DateTime? startTime, DateTime? finishTime, int userId)
        {
            var timerValues = new TimerHistory()
            {
                StartTime = startTime,
                FinishTime = finishTime
            };
            Context.Add(timerValues);
            Context.SaveChanges();

            var idTimerHistory = (Context.TimerHistories.Find(timerValues.Id));

            var userTimerValue = new UserTimerHistory()
            {
                TimerHistoryId = idTimerHistory.Id,
                UserId = userId
            };

            Context.UserTimerHistories.Add(userTimerValue);

            Context.SaveChanges();

            return timerValues;
        }
        public TimerHistory EditTimerValue(DateTime? startTime, DateTime? finishtTime, int userId, int? recordId)
        {

            var dbRecordUser = Context.Users.Single(user => user.Id == userId);

            IEnumerable<UserTimerHistory> userTimerHistoryHistories = Context.UserTimerHistories.OrderBy(userTimerHistory => userTimerHistory.UserId == userId)
                .ThenBy(userTimerHistory => userTimerHistory.TimerHistoryId);

            UserTimerHistory dbRecord;
            TimerHistory dbRecordTimerHistory;

            if (recordId == null)
            {
                dbRecord = userTimerHistoryHistories.Last();
            }
            else
            {
                dbRecord = userTimerHistoryHistories.Single(timerHistory => timerHistory.TimerHistoryId == recordId);
            }

            dbRecordTimerHistory = Context.TimerHistories.Single(record => record.Id == dbRecord.TimerHistoryId);

            //            UserTimerHistory dbRecord1 = Context.UserTimerHistories.OrderBy(e => e.UserId.OrderByDescending(x => x.propertyToSortOn)
            //.FirstOrDefault().DateTime);

            //dbRecordTimerHistory = Context.TimerHistories.Single(record => record.Id == dbRecord.TimerHistoryId);

            if (finishtTime == null)
            {
                finishtTime = dbRecordTimerHistory.FinishTime;
            }

            if (startTime == null)
            {
                startTime = dbRecordTimerHistory.StartTime;
            }

            dbRecordTimerHistory.FinishTime = finishtTime;

            dbRecordTimerHistory.StartTime = startTime;

            var TimerValues = new TimerHistory()
            {
                Id = dbRecordTimerHistory.Id,
                StartTime = startTime,
                FinishTime = finishtTime
            };
            Context.SaveChanges();

            //Context.TimerHistories.Single(timerHistory => timerHistory.Id == id).FinishTime = finishtTime;

            //Context.Update(TimerValues);

            return TimerValues;
        }
        //public TimerHistory EditTimerValue(int id, DateTime? startTime, DateTime? finishtTime)
        //{

        //    var dbRecord = Context.TimerHistories.Single(timerHistory => timerHistory.Id == id);

        //    if (finishtTime == new DateTime())
        //    {
        //        finishtTime = dbRecord.FinishTime;
        //    }

        //    if (startTime == new DateTime())
        //    {
        //        startTime = dbRecord.StartTime;
        //    }
        //    dbRecord.FinishTime = finishtTime;

        //    dbRecord.StartTime = startTime;

        //    var TimerValues = new TimerHistory()
        //    {
        //        Id = id,
        //        StartTime = startTime,
        //        FinishTime = finishtTime
        //    };
        //    Context.SaveChanges();

        //    //Context.TimerHistories.Single(timerHistory => timerHistory.Id == id).FinishTime = finishtTime;

        //    //Context.Update(TimerValues);

        //    return TimerValues;
        //}
        public TimerHistory DeteleTimerValue(int id)
        {
            var dbRecord = Context.TimerHistories.Single(timerHistory => timerHistory.Id == id);

            Context.Remove(dbRecord);

            var TimerValues = new TimerHistory()
            {
                Id = id,
                StartTime = dbRecord.StartTime,
                FinishTime = dbRecord.FinishTime
            };

            IEnumerable<UserTimerHistory> userTimerHistoryHistories = Context.UserTimerHistories.OrderBy(userTimerHistory => userTimerHistory.UserId);

            var dbRecordUserTimer = userTimerHistoryHistories.Single(timerHistory => timerHistory.TimerHistoryId == id);
            Context.Remove(dbRecordUserTimer);
            //Context.TimerHistories.Single(timerHistory => timerHistory.Id == id).FinishTime = finishtTime;

            //Context.Update(TimerValues);
            Context.SaveChanges();

            return TimerValues;
        }
    }
}
