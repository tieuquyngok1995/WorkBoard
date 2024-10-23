using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Net.WebSockets;
using System.Security.Claims;
using System.Text;
using WorkBoardServer.Helpers;
using WorkBoardServer.Models;
using WorkBoardServer.Services;

namespace WorkBoardServer.Controllers
{
    [MyApiController]
    public class HomeController : ControllerBase
    {
        private readonly HomeService _service;

        private readonly ICustomWebSocketManager _webSocketManager;

        public HomeController(HomeService service, ICustomWebSocketManager webSocketManager)
        {
            _service = service;
            _webSocketManager = webSocketManager;
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

                HomeModel model = new()
                {
                    ListTasks = _service.GetTaskModels(userId),

                    TaskDialog = new TaskModel()
                    {
                        DataTaskType = _service.GetDataTaskType(),
                        DataAssignee = _service.GetDataAssignee(),
                        DataPriority = _service.GetDataPriority(),
                        DataTaskStatus = _service.GetTaskStatus()
                    }
                };

                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpGet]
        public async Task ConnectWebSocket()
        {
            // Lấy user ID từ HttpContext
            string userId = HttpContext.Request.Query["userId"].ToString();

            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }

            WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            _webSocketManager.AddSocket(userId, webSocket);

            var buffer = new byte[1024 * 4];
            while (webSocket.State == WebSocketState.Open)
            {
                var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);

                if (webSocket.State == WebSocketState.CloseReceived)
                {
                    _webSocketManager.RemoveSocket(userId);

                    await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by server", CancellationToken.None);
                    break;
                }
            }
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