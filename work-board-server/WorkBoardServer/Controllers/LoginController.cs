using Microsoft.AspNetCore.Mvc;
using WorkBoardServer.Models;
using WorkBoardServer.Services;

namespace WorkBoardServer.Controllers
{
    [MyApiController]
    public class LoginController : ControllerBase
    {
        private readonly LoginService _service;
        private readonly JwtTokenService _jwtTokenService;

        public LoginController(LoginService service, JwtTokenService jwtTokenService)
        {
            _service = service;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost]
        public IActionResult SignIn(UserModel body)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserModel model = _service.SignIn(body.UserName, body.Password);

            if (model.UserName == null)
            {
                return Unauthorized();
            }

            string token = _jwtTokenService.GenerateToken(model);

            Response.Cookies.Append("authToken", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(30),
                Path = "/",
                IsEssential = true
            });
            var cookies = Request.Cookies; // Kiểm tra cookie hiện tại
            var responseCookies = Response.Cookies; // Kiểm tra cookie đã thêm vào phản hồi
            return Ok(model);
        }

        [HttpPost]
        public IActionResult SignUp(UserModel body)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            body = _service.SignUp(body.Email, body.UserName, body.Password);

            if (body.UserName == null)
            {
                return Unauthorized();
            }

            return Ok(body);
        }
    }
}