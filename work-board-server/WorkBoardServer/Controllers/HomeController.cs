using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Security.Claims;
using WorkBoardServer.Models;
using WorkBoardServer.Services;

namespace WorkBoardServer.Controllers
{
    [MyApiController]
    public class HomeController : ControllerBase
    {
        private readonly HomeService _service;

        public HomeController(HomeService service)
        {
            _service = service;
        }

        /// <summary>
        /// Get data init page
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetIndex()
        {
            try
            {
                string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userId is null)
                {
                    return NotFound();
                }

                HomeModel model = new HomeModel();
                model.listTasks = _service.GetTaskModels(userId);

                model.taskDialog = new TaskModel()
                {
                    DataTaskType = _service.GetDataTaskType(),
                    DataAssignee = _service.GetDataAssignee(),
                    DataPriority = _service.GetDataPriority(),
                    DataTaskStatus = _service.GetTaskStatus()
                };

                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        /// <summary>
        /// Create file wbs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult DownloadFile()
        {
            var package = new ExcelPackage();
            var worksheet = package.Workbook.Worksheets.Add("Sheet1");

            // Thêm dữ liệu
            worksheet.Cells[1, 1].Value = "Hello";
            worksheet.Cells[1, 2].Value = "World";
            worksheet.Cells["A2:C2"].Merge = true;
            // Đặt định dạng tên file
            var fileName = "example.xlsx";

            // Chuyển đổi thành byte array
            var fileStream = new MemoryStream();
            package.SaveAs(fileStream);
            fileStream.Position = 0;

            // Trả về file cho client
            return File(fileStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }
    }
}