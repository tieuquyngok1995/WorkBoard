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
                GlobalConstants.GET_TASK_TYPE).AsList();
        }

        public List<DataListOption> GetDataAssignee()
        {
            return _databaseService.ExecuteQuery<DataListOption>(
                GlobalConstants.GET_ASSIGNEE).AsList();
        }

        public List<DataListOption> GetDataPriority()
        {
            return _databaseService.ExecuteQuery<DataListOption>(
                GlobalConstants.GET_PRIORITY).AsList();
        }

        public List<DataListOption> GetTaskStatus()
        {
            return _databaseService.ExecuteQuery<DataListOption>(
                GlobalConstants.GET_TASK_STATUS).AsList();
        }

        public List<TaskModel> GetTaskModels(string? userID)
        {
            return _databaseService.ExecuteQuery<TaskModel>(
                GlobalConstants.GET_TASK, new { userID }).AsList();
        }
    }
}