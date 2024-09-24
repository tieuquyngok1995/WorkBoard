using Dapper;
using WorkBoardServer.Common;
using WorkBoardServer.Models;

namespace WorkBoardServer.Services
{
    public class HomeService
    {
        private readonly DatabaseService _databaseService;

        public HomeService(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public List<DataListOption> GetDataTaskType()
        {
            return _databaseService.ExecuteQuery<DataListOption>(
                GlobalConstants.PGetTaskType).AsList();
        }

        public List<DataListOption> GetDataAssignee()
        {
            return _databaseService.ExecuteQuery<DataListOption>(
                GlobalConstants.PGetAssignee).AsList();
        }

        public List<DataListOption> GetDataPriority()
        {
            return _databaseService.ExecuteQuery<DataListOption>(
                GlobalConstants.PGetPriority).AsList();
        }

        public List<TaskModel> GetTaskModels(int userID)
        {
            return _databaseService.ExecuteQuery<TaskModel>(
                GlobalConstants.PGetTask, new { @UserID = userID }).AsList();
        }
    }
}
