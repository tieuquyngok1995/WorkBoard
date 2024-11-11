using Dapper;
using WorkBoardServer.Common;
using WorkBoardServer.Models;

namespace WorkBoardServer.Services
{
    public class CalendarService
    {
        private readonly DatabaseService _databaseService;

        public CalendarService(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public List<TaskModel> GetAllTask(string userID)
        {
            return _databaseService.ExecuteQuery<TaskModel>(
                GlobalConstants.GET_ALL_TASK, new { userID }).AsList();
        }
    }
}
