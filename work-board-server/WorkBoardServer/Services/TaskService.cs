using Microsoft.Data.SqlClient;
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
                _databaseService.ExecuteNonQuery(
                    GlobalConstants.PCreateTask, new SqlParameter
                    {
                        ParameterName = "@data",
                        SqlDbType = SqlDbType.Structured,
                        TypeName = "TaskType",
                        Value = CreateProductRecords(model)
                    });
            }
            catch (Exception ex)
            {
                var test = ex;
                return false;
            }
            return true;
        }

        private DataTable CreateProductRecords(TaskModel model)
        {
            DataTable taskTable = new DataTable();
            taskTable.Columns.Add("ModuleID", typeof(string));           // nvarchar(25)
            taskTable.Columns.Add("TaskName", typeof(string));           // nvarchar(100)
            taskTable.Columns.Add("Type", typeof(short));                // smallint not null
            taskTable.Columns.Add("NumRedmine", typeof(int));            // int
            taskTable.Columns.Add("Assignee", typeof(short));            // smallint not null
            taskTable.Columns.Add("Priority", typeof(short));            // smallint
            taskTable.Columns.Add("DateCreate", typeof(DateTime));       // date
            taskTable.Columns.Add("EstimatedHour", typeof(short));       // smallint
            taskTable.Columns.Add("DateDelivery", typeof(DateTime));     // date
            taskTable.Columns.Add("Note", typeof(string));               // nvarchar(max) NULL

            taskTable.Rows.Add(
                model.ModuleID,
                model.TaskName,
                model.Type,
                model.NumRedmine,
                model.Assignee,
                model.Priority.HasValue ? model.Priority.Value : 2,
                model.DateCreate,
                model.EstimatedHour,
                model.DateDelivery,
                model.Note);

            return taskTable;
        }
    }
}
