using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using WorkBoardServer.Models;
using WorkBoardServer.Services;

namespace WorkBoardServer.Controllers
{
    [MyApiController]
    public class TaskController : ControllerBase
    {
        public readonly TaskService _service;

        public TaskController(TaskService taskService)
        {
            _service = taskService;
        }

        [HttpPost]
        public IActionResult CreateTask(TaskModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool result = _service.Create(model);

                if (!result)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }

                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpPost]
        public IActionResult UpdateTask(TaskModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool result = _service.Update(model);

                if (!result)
                {
                    return BadRequest("Failed to update data.");
                }

                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpGet]
        public async Task UpdateTaskStatus()
        {
            WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            var buffer = new byte[1024 * 4];

            while (webSocket.State == WebSocketState.Open)
            {
                var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                var body = Encoding.UTF8.GetString(buffer, 0, result.Count);

                if (string.IsNullOrWhiteSpace(body))
                {
                    var errorBytes = Encoding.UTF8.GetBytes("Received empty message");
                    await webSocket.SendAsync(new ArraySegment<byte>(errorBytes, 0, errorBytes.Length),
                                              WebSocketMessageType.Text, true, CancellationToken.None);
                    continue;
                }

                var receivedData = JsonSerializer.Deserialize<TaskModel>(body);

                if (receivedData == null)
                {
                    var errorBytes = Encoding.UTF8.GetBytes("Invalid data format");
                    await webSocket.SendAsync(new ArraySegment<byte>(errorBytes, 0, errorBytes.Length),
                                              WebSocketMessageType.Text, true, CancellationToken.None);
                    continue;
                }

                string moduleID = receivedData.ModuleID;
                short? taskStatus = receivedData.TaskStatus;

                await _service.UpdateTaskStatus(moduleID, taskStatus);
            }
        }

        [HttpGet]
        public IActionResult UpdateTaskProgress(string moduleID, int workHour, int progress, string? note)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool result = _service.UpdateProgress(moduleID, workHour, progress, note);

                if (!result)
                {
                    return BadRequest("Failed to update data.");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult DeleteTask(string moduleID)
        {
            try
            {
                bool result = _service.Delete(moduleID);

                if (!result)
                {
                    return BadRequest("Failed to update data.");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }
    }
}
