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

        //public List<TimerHistory> GetTimerHistory(int userId)
        //{
        //    return Context.TimerHistories
        //            .Where(it => it.UserId == userId)
        //            .ToList();
        //}

        public List<TimerHistory> GetTimerHistory(int userId, DateTime? monthFilter = null)
        {
            var userTimerHistories = Context.TimerHistories.Where(team => team.UserId == userId);
            if (monthFilter.HasValue)
            {
                userTimerHistories = userTimerHistories
                    .Where(it =>
                        it.StartTime.Value.Month == monthFilter.Value.Month &&
                        it.StartTime.Value.Year == monthFilter.Value.Year);
            }

            return userTimerHistories
                .ToList();


            //var timerHistories = Context.TimerHistories
            //        .Where(it => it.UserId == userId)
            //        .ToList();
            //return userTimerHistories;
            //var users = Context.Users
            //    .Where(UserTimerHistories => UserTimerHistories.ComputedProps.TimerHistories == userId 
            //    && UserTimerHistories.ComputedProps.TimerHistories)
            //    .ToList();


            //if (user == null)
            //    return new List<TimerHistory>();

            //List<UserTimerHistory> userTimerHistories = Context.UserTimerHistories.Where(timerHistory => timerHistory.UserId == user.Id).ToList<UserTimerHistory>();

            //List<TimerHistory> timerHistories = new List<TimerHistory>();

            //foreach (UserTimerHistory userTimerHistory in userTimerHistories)
            //{
            //    var a = Context.TimerHistories.SingleOrDefault(timerHistory => timerHistory.Id == userTimerHistory.TimerHistoryId);
            //    if (a.StartTime.Value.Date.Month == dateTimeMonth.Value.Month)
            //        timerHistories.Add(a);
            //}

            ////return Context.TimerHistory.ToList();
            //if (dateTimeMonth == null)
            //{
            //    return timerHistories;
            //}
            //var b = timerHistories.GroupBy(m => m.StartTime.Value.Date).ToList();

            //var c = (new List<TimerHistory>(b.OfType<TimerHistory>()));
            //return c;




        }
        public TimerHistory AddTimerStartValue(DateTime startTime, int userId)
            => AddTimerValue(startTime, finishTime: null, userId, isModified:false);

        public TimerHistory AddTimerValue(DateTime? startTime, DateTime? finishTime, int userId, bool isModified = true)
        {
            TimerHistory? dbRecordTimerValue = Context.TimerHistories.SingleOrDefault(timeH => timeH.UserId == userId && timeH.FinishTime == null);

            if (dbRecordTimerValue != null)
            {

                return dbRecordTimerValue;
            }

            var timerValues = new TimerHistory()
            {
                StartTime = startTime,
                FinishTime = finishTime,
                UserId = userId,
                IsModified = isModified,
            };

            Context.Add(timerValues);

            Context.SaveChanges();

            return timerValues;
        }
        public TimerHistory EditTimerValue(DateTime startTime, DateTime finishTime, int userId, int recordId)
        {
            var dbRecord = Context.TimerHistories.Single(it => it.Id == recordId && it.UserId == userId);

            dbRecord.IsModified = true;

            dbRecord.FinishTime = finishTime;

            dbRecord.StartTime = startTime;

            Context.SaveChanges();

            return dbRecord;
        }
        public TimerHistory AddTimerFinishValue(int userId)
        {
            TimerHistory dbRecordTimerValue;
            try
            {
                dbRecordTimerValue = Context.TimerHistories.Single(timeH => timeH.UserId == userId && timeH.FinishTime == null);
            }
            catch (InvalidOperationException ex)
            {
                dbRecordTimerValue = Context.TimerHistories.Where(timeH => timeH.UserId == userId).OrderBy(timeH => timeH.FinishTime).Last();
                return dbRecordTimerValue;
            }
            //dbRecordTimerValue.FinishTime = finishTime;

            dbRecordTimerValue.FinishTime = DateTime.UtcNow;

            Context.SaveChanges();

            return dbRecordTimerValue;
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

            //Context.TimerHistories.Single(timerHistory => timerHistory.Id == id).FinishTime = finishtTime;

            //Context.Update(TimerValues);
            Context.SaveChanges();

            return dbRecord;
        }
        public int? GetTimeByMonth(int userId, DateTime monthDate)
        {
            var dbRecords = Context.TimerHistories
                        .Where(it => it.UserId == userId 
                        && it.StartTime.Value.Month == monthDate.Month
                        && it.StartTime.Value.Year == monthDate.Year
                        )
                        ;

            return dbRecords.Select(it => (EF.Functions.DateDiffMinute(it.StartTime, it.FinishTime))).Sum();

        }
    }
}
