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
                _databaseService.ExecuteQuery<UserModel>(
                    GlobalConstants.PCreateTask, new SqlParameter
                    {
                        ParameterName = "@data",
                        SqlDbType = SqlDbType.Structured,
                        TypeName = "TaskType",
                        Value = model
                    });
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
