using Microsoft.AspNetCore.Mvc;
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
        public IActionResult UpdateTaskStatus(string moduleID, short taskStatus)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool result = _service.UpdateTaskStatus(moduleID, taskStatus);

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
