using Microsoft.Data.SqlClient;
using Microsoft.Data.SqlClient.Server;
using System.Data;
using WorkBoardServer.Common;
using WorkBoardServer.Models;

namespace WorkBoardServer.Services
{
    public class TaskService
    {
        private readonly DatabaseService _databaseService;

        public TaskService(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public bool Create(TaskModel model)
        {
            try
            {
                _databaseService.ExecuteQuery<UserModel>(
                    GlobalConstants.PCreateTask, new SqlParameter
                    {
                        ParameterName = "@data",
                        SqlDbType = SqlDbType.Structured,
                        TypeName = "TaskType",
                        Value = GetProductRecords(model)
                    });
            }
            catch (Exception ex)
            {
                var test = ex;
                return false;
            }
            return true;
        }

        private SqlDataRecord GetProductRecords(TaskModel model)
        {
            SqlMetaData[] metaData = new SqlMetaData[]
            {
                new SqlMetaData("ModuleID", SqlDbType.NVarChar, 25),
                new SqlMetaData("TaskName", SqlDbType.NVarChar, 100),
                new SqlMetaData("TaskType", SqlDbType.SmallInt),
                new SqlMetaData("NumRedmine", SqlDbType.Int),
                new SqlMetaData("Assignee", SqlDbType.SmallInt),
                new SqlMetaData("Priority", SqlDbType.SmallInt),
                new SqlMetaData("DateCreate", SqlDbType.Date),
                new SqlMetaData("EstimatedHour", SqlDbType.SmallInt),
                new SqlMetaData("DateDelivery", SqlDbType.Date),
                new SqlMetaData("Note", SqlDbType.NVarChar)
            };

            SqlDataRecord record = new SqlDataRecord(metaData);
            record.SetString(0, model.ModuleID);
            record.SetString(1, model.TaskName);
            record.SetInt16(2, model.TaskType);
            record.SetInt32(3, model.NumRedmine.HasValue ? model.NumRedmine.Value : 0);
            record.SetInt16(4, model.Assignee);
            record.SetInt16(5, model.Priority.HasValue ? model.Priority.Value : (short)0);
            record.SetDateTime(6, model.DateCreate);
            record.SetInt16(7, model.EstimatedHour);
            record.SetDateTime(8, model.DateDelivery);
            record.SetString(9, model.Note);

            return record;
        }
    }
}
