using Microsoft.AspNetCore.Mvc;
using Serilog;
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
                    Log.Error(("[Send Mail Error] --> Not found user"), LogLevel.Error);
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
                Log.Error(string.Format("[Get Index Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
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
                Log.Error(string.Format("[Connect Web Socket Exception] --> Exception has occurred: {0}", "User is not authenticated."), LogLevel.Error);
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

                    if (webSocket.State == WebSocketState.Open || webSocket.State == WebSocketState.CloseReceived ||
                        webSocket.State == WebSocketState.CloseSent)
                    {
                        Log.Information(("Connect Web Socket closed by server"), LogLevel.Information);
                        await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by server", CancellationToken.None);
                    }
                    break;
                }
            }
        }
    }
}