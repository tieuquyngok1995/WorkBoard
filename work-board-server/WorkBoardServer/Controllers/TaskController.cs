using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Net.WebSockets;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using WorkBoardServer.Common;
using WorkBoardServer.Helpers;
using WorkBoardServer.Models;
using WorkBoardServer.Services;

namespace WorkBoardServer.Controllers
{
    [MyApiController]
    public class TaskController : ControllerBase
    {
        public readonly TaskService _service;

        private readonly ICustomWebSocketManager _webSocketManager;

        public TaskController(TaskService taskService, ICustomWebSocketManager webSocketManager)
        {
            _service = taskService;
            _webSocketManager = webSocketManager;
        }

        /// <summary>
        /// Create new task
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult CreateTask(TaskModel model)
        {
            try
            {
                string? userName = User.FindFirst(ClaimTypes.Name)?.Value;

                if (!ModelState.IsValid)
                {
                    Log.Error(("[Create Task Error] --> Bad Request"), LogLevel.Error);
                    return BadRequest(ModelState);
                }

                int newID = _service.Create(model);

                if (newID == -1)
                {
                    Log.Error(("[Create Task Error] --> Create task fail"), LogLevel.Error);
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }

                var socket = _webSocketManager.GetSocketByUserId(model.Assignee.ToString() ?? "");
                if (socket == null || socket.State != WebSocketState.Open)
                {
                    Log.Error(("[Create Task Error] -->  Web socket " + Message.MESS_ERR_USER_WEB_SOCKET), LogLevel.Error);
                }
                else
                {
                    var buffer = Encoding.UTF8.GetBytes(Message.FormatMessage(Message.NOTI_CREATE_TASK, userName ?? "", model.ModuleID ?? ""));
                    socket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
                }

                model.ID = newID;
                return Ok(model);
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Create Task Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        /// <summary>
        /// Update info task
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult UpdateTask(TaskModel model)
        {
            try
            {
                string? userName = User.FindFirst(ClaimTypes.Name)?.Value;

                if (!ModelState.IsValid)
                {
                    Log.Error(("[Create Task Error] --> Bad Request"), LogLevel.Error);
                    return BadRequest(ModelState);
                }

                bool result = _service.Update(model);

                if (!result)
                {
                    Log.Error(("[Create Task Error] --> " + Message.MESS_ERR_UPDATE_TASK), LogLevel.Error);
                    return BadRequest(Message.MESS_ERR_UPDATE_TASK);
                }

                var socket = _webSocketManager.GetSocketByUserId(model.Assignee.ToString() ?? "");
                if (socket == null || socket.State != WebSocketState.Open)
                {
                    Log.Error(("[Create Task Error] --> Web socket " + Message.MESS_ERR_USER_WEB_SOCKET), LogLevel.Error);
                }
                else
                {
                    var buffer = Encoding.UTF8.GetBytes(Message.FormatMessage(Message.NOTI_EDIT_TASK, userName ?? "", model.ModuleID ?? ""));
                    socket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
                }

                return Ok(model);
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Update Task Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        /// <summary>
        /// Update column progress
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task UpdateTaskStatus()
        {
            try
            {
                WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

                var buffer = new byte[1024 * 4];

                while (webSocket.State == WebSocketState.Open)
                {
                    var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                    var body = Encoding.UTF8.GetString(buffer, 0, result.Count);

                    if (string.IsNullOrWhiteSpace(body))
                    {
                        Log.Error(("[Update Task Status Error] --> Received empty message"), LogLevel.Error);
                        continue;
                    }

                    TaskModel receivedData;
                    try
                    {
                        receivedData = JsonSerializer.Deserialize<TaskModel>(body) ?? new();
                    }
                    catch (JsonException)
                    {
                        Log.Error(("[Update Task Status Error] --> Invalid data format"), LogLevel.Error);
                        continue;
                    }
                    if (receivedData != null)
                    {
                        int id = receivedData.ID;
                        string moduleID = receivedData.ModuleID ?? "";
                        short? taskStatus = receivedData.TaskStatus;
                        decimal? workHour = receivedData.WorkHour;
                        int? progress = receivedData.Progress;

                        DateTime? utcDateTime = receivedData.DateWork;
                        DateTime? dateWork = utcDateTime.HasValue ? utcDateTime.Value.ToLocalTime() : null;

                        await _service.UpdateTaskStatus(id, moduleID, taskStatus, workHour, progress, dateWork);
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Update Task Status Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
            }
        }

        /// <summary>
        /// Update task progress
        /// </summary>
        /// <param name="id"></param>
        /// <param name="moduleID"></param>
        /// <param name="workHour"></param>
        /// <param name="progress"></param>
        /// <param name="note"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult UpdateTaskProgress(int id, string moduleID, decimal workHour, int progress, string dateWorkStart, string? note)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Log.Error(("[Update Task Progress Error] --> Bad Request"), LogLevel.Error);
                    return BadRequest(ModelState);
                }

                bool result = _service.UpdateProgress(id, moduleID, workHour, progress, dateWorkStart, note ?? "");

                if (!result)
                {
                    Log.Error(("[Update Task Progress Error] --> " + Message.MESS_ERR_UPDATE_TASK_PROGRESS), LogLevel.Error);
                    return BadRequest(Message.MESS_ERR_UPDATE_TASK_PROGRESS);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Update Task Progress Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        /// <summary>
        /// Delete task
        /// </summary>
        /// <param name="id"></param>
        /// <param name="moduleID"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult DeleteTask(int id, string moduleID, short assignee)
        {
            try
            {
                string? userName = User.FindFirst(ClaimTypes.Name)?.Value;

                bool result = _service.Delete(id, moduleID);

                if (!result)
                {
                    Log.Error(("[Delete Task Error] --> " + Message.MESS_ERR_DELETE_TASK), LogLevel.Error);
                    return BadRequest(Message.MESS_ERR_DELETE_TASK);
                }

                var socket = _webSocketManager.GetSocketByUserId(assignee.ToString() ?? "");
                if (socket == null || socket.State != WebSocketState.Open)
                {

                    Log.Error(("[Delete Task Error] --> Web socket " + Message.MESS_ERR_USER_WEB_SOCKET), LogLevel.Error);
                }
                else
                {
                    var buffer = Encoding.UTF8.GetBytes(Message.FormatMessage(Message.NOTI_DELETE_TASK, userName ?? "", moduleID));
                    socket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Delete Task Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
            }
        }
    }
}
