using Dapper;
using OfficeOpenXml;
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
        public Dictionary<short, string> GetDataTaskTypeJP()
        {
            return _databaseService.ExecuteQuery<DataListOption>(
                GlobalConstants.PGetTaskTypeJP).ToDictionary(item => item.Key, item => item.Value);
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

        public List<DataListOption> GetTaskStatus()
        {
            return _databaseService.ExecuteQuery<DataListOption>(
                GlobalConstants.PGetTaskStatus).AsList();
        }

        public List<TaskModel> GetTaskModels(string? userID)
        {
            return _databaseService.ExecuteQuery<TaskModel>(
                GlobalConstants.PGetTask, new { userID }).AsList();
        }

        public List<TaskModel> GetDataWBS()
        {
            return _databaseService.ExecuteQuery<TaskModel>(
                GlobalConstants.PGetDataWBS).AsList();
        }

        public void CreateFileWBS(ExcelWorksheet worksheet, int row, TaskModel model)
        {
            // Column B: ID module
            worksheet.Cells[row, 2].Value = model.ModuleID;
            // Column D: Task Name
            worksheet.Cells[row, 4].Value = model.TaskName;
            // Column E: Task Type
            worksheet.Cells[row, 5].Value = model.TypeName;

            // Column G: Assignee
            worksheet.Cells[row, 6].Value = model.Assignee;

            // Column M: Estimated Hour
            worksheet.Cells[row, 13].Value = model.EstimatedHour;
            // Column N: Work Hour
            worksheet.Cells[row, 15].Value = model.WorkHour;

            // Column Q: Date Work Start
            worksheet.Cells[row, 17].Value = model.DateWorkStart.HasValue ? model.DateWorkStart.Value.ToString("yyyy/MM/dd") : string.Empty;
            // Column R: Date Work End
            worksheet.Cells[row, 18].Value = model.DateWorkEnd.HasValue ? model.DateWorkEnd.Value.ToString("yyyy/MM/dd") : string.Empty;

            // Column S: Date Create
            worksheet.Cells[row, 19].Value = model.DateCreate.HasValue ? model.DateCreate.Value.ToString("yyyy/MM/dd") : string.Empty;
            // Column T: Date Delivery
            worksheet.Cells[row, 20].Value = model.DateDelivery.HasValue ? model.DateDelivery.Value.ToString("yyyy/MM/dd") : string.Empty;

        }
    }
}