using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using WorkBoardServer.Models;
using WorkBoardServer.Services;

namespace WorkBoardServer.Controllers
{
    [MyApiController]
    public class SettingController : Controller
    {
        private readonly SettingService _service;

        public SettingController(SettingService service)
        {
            _service = service;
        }

        /// <summary>
        /// Create file wbs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult DownloadFile()
        {
            // Get data using to WBS
            List<TaskModel> listData = _service.GetDataWBS();

            // Get dictionary type key and name jp
            Dictionary<short, string> dicType = _service.GetDataTaskTypeJP(); ;

            // Create work sheets excel 
            ExcelPackage package = new();
            ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("WBS_Phase3");

            int startIndex = 0, i = 2;
            string moduleId = string.Empty;
            foreach (TaskModel item in listData)
            {
                if (item.Type.HasValue) item.TypeName = dicType[item.Type.Value];

                // Create row file excel
                _service.CreateFileWBS(worksheet, i, item);

                if (item.ModuleID != moduleId)
                {
                    if (moduleId != null && startIndex != i - 1)
                    {
                        worksheet.Cells[$"B{startIndex}:B{i - 1}"].Merge = true;
                    }
                    startIndex = i;
                }
                moduleId = item.ModuleID ?? "";
                i++;
            }

            if (startIndex != i - 1)
            {
                worksheet.Cells[$"B{startIndex}:B{i - 1}"].Merge = true;
            }

            // Save file to stream
            var fileStream = new MemoryStream();
            package.SaveAs(fileStream);
            fileStream.Position = 0;

            // Return file wbs to client
            return File(fileStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }
    }
}
