using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Security.Claims;
using System.Text.RegularExpressions;
using WorkBoardServer.Common;
using WorkBoardServer.Models;
using WorkBoardServer.Services;

namespace WorkBoardServer.Controllers
{
    [MyApiController]
    public class SettingController : Controller
    {
        private readonly SettingService _service;
        private readonly PasswordHasher<UserModel> _passwordHasher;

        public SettingController(SettingService service)
        {
            _service = service;
            _passwordHasher = new PasswordHasher<UserModel>();
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            try
            {
                string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userId is null)
                {
                    return NotFound();
                }

                UserListModel model = new()
                {
                    Users = _service.GetUsers(),
                    DataRole = _service.GetDataRole()
                };

                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        /// <summary>
        /// Update info user
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult UpdateUser(UserModel body)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                string password = body.Password;
                if (IsBase64String(password) && password.Length > 50) { }
                else
                {
                    password = _passwordHasher.HashPassword(body, body.Password ?? "");
                }
                bool result = _service.Update(body.UserID, body.Email ?? "", body.UserName ?? "", password, body.RoleID);

                if (!result)
                {
                    return BadRequest(Message.MESS_ERR_UPDATE_USER);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        public IActionResult DeleteUser(int userID)
        {
            try
            {
                bool result = _service.Delete(userID);

                if (!result)
                {
                    return BadRequest(Message.MESS_ERR_DELETE_USER);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        /// <summary>
        /// Create file wbs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult DownloadFile()
        {
            // Get data using to WBS
            List<TaskModel> listData = _service.GetDataWBS();

            if (listData.Count == 0)
            {
                return StatusCode(204);
            }

            // Get dictionary type key and name jp
            Dictionary<short, string> dicType = _service.GetDataTaskTypeJP(); ;

            // Create work sheets excel 
            ExcelPackage package = new();
            ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("WBS_Phase3");

            int startIndex = 0, i = 2;
            string moduleId = string.Empty;
            foreach (TaskModel item in listData)
            {
                if (item.Type.HasValue) item.TypeName = dicType[item.Type.Value];

                // Create row file excel
                _service.CreateFileWBS(worksheet, i, item);

                if (item.ModuleID != moduleId)
                {
                    if (moduleId != null && startIndex != i - 1)
                    {
                        worksheet.Cells[$"B{startIndex}:B{i - 1}"].Merge = true;
                    }
                    startIndex = i;
                }
                moduleId = item.ModuleID ?? "";
                i++;
            }

            if (startIndex != i - 1)
            {
                worksheet.Cells[$"B{startIndex}:B{i - 1}"].Merge = true;
            }

            // Save file to stream
            var fileStream = new MemoryStream();
            package.SaveAs(fileStream);
            fileStream.Position = 0;

            // Return file wbs to client
            return File(fileStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }

        private bool IsBase64String(string base64)
        {
            return (base64.Length % 4 == 0) && Regex.IsMatch(base64, @"^[a-zA-Z0-9\+/]*={0,3}$", RegexOptions.None);
        }
    }
}