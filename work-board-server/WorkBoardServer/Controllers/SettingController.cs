using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using OfficeOpenXml;
using Serilog;
using System.Net.Mail;
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
        public IActionResult GetTemplateSendMail()
        {
            try
            {
                List<TemplateSendMailModel> templates = _service.GetTemplateSendMail();

                List<DataListOption> assigneeList = _service.GetDataAssignee();
                assigneeList.Insert(0, new DataListOption { Key = -1, Value = "All" });

                TemplateSendMailListModel model = new()
                {
                    DataTemplate = templates.Select(x => new DataListOption { Key = x.TemplateID.Value, Value = x.TemplateName }).ToList(),
                    DataToUser = assigneeList,
                    Templates = templates
                };

                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTemplateSendMailAsync(TemplateSendMailModel body)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                //if (body.TemplateID == null)
                //{
                //    _service.CreateTemplateSendMail(body.TemplateName, body.Subject, body.Content, body.ToUser);
                //}
                //else
                //{
                //    _service.UpdateTemplateSendMail(body.TemplateID, body.Subject, body.Content, body.ToUser);
                //}

                await SendMail();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        private async Task SendMail()
        {

            var _smtpServer = "mail.fujinet.net";
            var _username = "tuan-vq@fujinet.net";
            var _toEmail = "thuan-doanm@fujinet.net";
            var _password = "Abc123456";

            try
            {
                var email = new MimeMessage();

                email.From.Add(new MailboxAddress("Sender Name", _username));
                email.To.Add(new MailboxAddress("Receiver Name", _toEmail));

                email.Subject = "Testing out email sending";
                email.Body = new TextPart(MimeKit.Text.TextFormat.Plain)
                {
                    Text = "Hello all the way from the land of C#"
                };
                using (var client = new MailKit.Net.Smtp.SmtpClient())
                {
                    await client.ConnectAsync(_smtpServer, 25, SecureSocketOptions.None);
                    await client.AuthenticateAsync(new SaslMechanismLogin(_username, _password));
                    await client.SendAsync(email);
                    await client.DisconnectAsync(true);
                }
            }
            catch (SmtpException ex)
            {
                Log.Error(string.Format("[Send Mail Exception] --> SMTPException has occurred: {0}", ex.Message), LogLevel.Error);
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Send Mail Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
            }
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
                bool result = _service.UpdateUser(body.UserID, body.Email ?? "", body.UserName ?? "", password, body.RoleID);

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
                bool result = _service.DeleteUser(userID);

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