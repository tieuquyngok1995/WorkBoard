using Dapper;
using OfficeOpenXml;
using WorkBoardServer.Common;
using WorkBoardServer.Models;

namespace WorkBoardServer.Services
{
    public class SettingService
    {
        private readonly DatabaseService _databaseService;

        public SettingService(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public List<TaskModel> GetDataWBS()
        {
            return _databaseService.ExecuteQuery<TaskModel>(
                GlobalConstants.GET_DATA_WBS).AsList();
        }
        public Dictionary<short, string> GetDataTaskTypeJP()
        {
            return _databaseService.ExecuteQuery<DataListOption>(
                GlobalConstants.GET_TASK_TYPE_JP).ToDictionary(item => item.Key, item => item.Value);
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
            worksheet.Cells[row, 15].Value = model.WorkHour.HasValue ? double.Parse(Math.Round(model.WorkHour.Value, 2).ToString("0.##")) : 0.0;

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
