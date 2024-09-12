using Microsoft.AspNetCore.Mvc;
using WorkBoardServer.Models;
using WorkBoardServer.Services;

namespace WorkBoardServer.Controllers
{
    [MyApiControllerAttribute]
    public class LoginController : ControllerBase
    {
        private readonly LoginService _service;

        public LoginController(LoginService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult SignIn(string userName, string password)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserModel model = _service.SignIn(userName, password);

            return Ok(model);
        }

        [HttpPost]
        public IActionResult SignUp(UserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            model = _service.SignIn(model.UserName, model.Password);

            return Ok(model);
        }
    }
}
