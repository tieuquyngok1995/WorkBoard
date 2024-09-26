using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        public IActionResult GetIndex()
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
    }
}
