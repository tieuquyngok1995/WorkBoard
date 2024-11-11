using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Security.Claims;
using WorkBoardServer.Models;
using WorkBoardServer.Services;

namespace WorkBoardServer.Controllers
{

    [MyApiController]
    public class CalendarController : ControllerBase
    {
        private readonly CalendarService _service;

        public CalendarController(CalendarService service)
        {
            _service = service;
        }

        public IActionResult GetAllTask()
        {
            try
            {
                string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userId is null)
                {
                    Log.Error(("[Get All Task Error] --> Not found user"), LogLevel.Error);
                    return NotFound();
                }

                List<TaskModel> tasks = _service.GetAllTask(userId);

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Get All Task Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
            }
        }
    }
}
