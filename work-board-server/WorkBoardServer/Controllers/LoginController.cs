﻿using Microsoft.AspNetCore.Mvc;
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

            model.Token = _jwtTokenService.GenerateToken(model);

            return Ok(model);
        }

        [HttpPost]
        public IActionResult SignUp(UserModel body)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserModel model = _service.SignUp(body.Email, body.UserName, body.Password);

            if (model.UserName == null)
            {
                return Unauthorized();
            }

            model.Token = _jwtTokenService.GenerateToken(model);

            return Ok(model);
        }
    }
}