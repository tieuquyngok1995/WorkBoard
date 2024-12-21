using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using WorkBoardServer.Common;
using WorkBoardServer.Models;
using WorkBoardServer.Services;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace WorkBoardServer.Controllers
{
    [MyApiController]
    public class LoginController : ControllerBase
    {
        private readonly LoginService _service;

        private readonly PasswordHasher<UserModel> _passwordHasher;

        private readonly JwtTokenService _jwtTokenService;

        public LoginController(LoginService service, JwtTokenService jwtTokenService)
        {
            _service = service;
            _passwordHasher = new PasswordHasher<UserModel>();
            _jwtTokenService = jwtTokenService;
        }

        [HttpGet]
        public IActionResult SignIn(string userName, string password)
        {
            try
            {
                if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                {
                    return BadRequest(ModelState);
                }

                UserModel model = _service.SignIn(userName);

                if (model.UserName == null)
                {
                    Log.Error(("[Sign In Error] --> Unauthorized"), LogLevel.Error);
                    return Unauthorized();
                }

                PasswordVerificationResult verificationResult = _passwordHasher.VerifyHashedPassword(model, model.Password ?? "", password);

                if (verificationResult == PasswordVerificationResult.Success)
                {
                    model.Token = _jwtTokenService.GenerateToken(model);

                    return Ok(model);
                }

                return StatusCode(499, new
                {
                    Code = 499,
                    Message = "Sign-in failed: Incorrect username or password.",
                });
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Sign In Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpPost]
        public IActionResult SignUp(UserModel body)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                string passwordEmail = body.Password ?? "";
                body.Password = _passwordHasher.HashPassword(body, body.Password ?? "");
                UserModel model = _service.SignUp(body.Email ?? "", body.UserName ?? "", body.Password ?? "", passwordEmail);

                if (model.UserName == null)
                {
                    Log.Error(("[Sign Up Error] --> The registered account already exists."), LogLevel.Error);
                    return StatusCode(406);
                }

                model.Token = _jwtTokenService.GenerateToken(model);

                return Ok(model);
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Sign Up Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
            }
        }
    }
}