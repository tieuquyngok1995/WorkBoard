using Microsoft.AspNetCore.Mvc;
using WorkBoardServer.Models;
using WorkBoardServer.Services;

namespace WorkBoardServer.Controllers
{
    [MyApiControllerAttribute]
    public class HomeController : ControllerBase
    {
        private readonly HomeService _service;

        public HomeController(HomeService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetIndex(int userID)
        {
            HomeModel model = new HomeModel();

            model.listTasks = _service.GetTaskModels(userID);
            if (model.listTasks.Count == 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            model.taskDialog = new TaskModel()
            {
                DataTaskType = _service.GetDataTaskType(),
                DataAssignee = _service.GetDataAssignee(),
                DataPriority = _service.GetDataPriority()
            };

            return Ok(model);
        }
    }
}
