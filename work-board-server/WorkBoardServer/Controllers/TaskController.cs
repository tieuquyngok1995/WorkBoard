﻿using Microsoft.AspNetCore.Mvc;
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
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                int newID = _service.Create(model);

                if (newID == -1)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }

                model.ID = newID;
                return Ok(model);
            }
            catch (Exception ex)
            {
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

        /// <summary>
        /// Update column progress
        /// </summary>
        /// <returns></returns>
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

                int id = receivedData.ID;
                string moduleID = receivedData.ModuleID;
                short? taskStatus = receivedData.TaskStatus;
                decimal? workHour = receivedData.WorkHour;
                int? progress = receivedData.Progress;

                DateTime? utcDateTime = receivedData.DateWork;
                DateTime? dateWork = utcDateTime.HasValue ? utcDateTime.Value.ToLocalTime() : null;

                await _service.UpdateTaskStatus(id, moduleID, taskStatus, workHour, progress, dateWork);
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
        public IActionResult UpdateTaskProgress(int id, string moduleID, decimal workHour, int progress, string? note)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool result = _service.UpdateProgress(id, moduleID, workHour, progress, note);

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

        /// <summary>
        /// Delete task
        /// </summary>
        /// <param name="id"></param>
        /// <param name="moduleID"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult DeleteTask(int id, string moduleID)
        {
            try
            {
                bool result = _service.Delete(id, moduleID);

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
