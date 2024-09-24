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
            var cookies = Request.Cookies;
            // Kiểm tra cookie hiện tại
            //var userId = GetUserIdFromToken(HttpContext);

            HomeModel model = new HomeModel();

            model.listTasks = _service.GetTaskModels(0);
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

        private string GetUserIdFromToken(HttpContext httpContext)
        {
            if (httpContext.User.Identity.IsAuthenticated)
            {
                var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier);
                return userIdClaim?.Value;
            }
            return null;
        }
    }
}
