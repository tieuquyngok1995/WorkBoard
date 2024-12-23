using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using Serilog;
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
                Log.Error(string.Format("[Get Template Send Mail Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpPost]
        public IActionResult UpdateTemplateSendMail(TemplateSendMailModel body)
        {
            try
            {
                if (body.TemplateID == null)
                {
                    _service.CreateTemplateSendMail(body.TemplateName, body.Subject, body.Content, body.ToUser);
                }
                else
                {
                    _service.UpdateTemplateSendMail(body.TemplateID, body.Subject, body.Content, body.ToUser);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Update Template Send Mail] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpPost]
        public IActionResult SendMail(TemplateSendMailModel body)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                string? email = User.FindFirst(ClaimTypes.Email)?.Value;
                string? password = User.FindFirst(ClaimTypes.Sid)?.Value;

                if (email is null)
                {
                    Log.Error(("[Send Mail Error] --> Not found user"), LogLevel.Error);
                    return NotFound();
                }

                _service.SendMail(email, password, body);

                return Ok();
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Send Mail Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
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
                    Log.Error(("[Get User Error] --> Not found user"), LogLevel.Error);
                    return NotFound();
                }

                UserListModel model = new()
                {
                    Users = _service.GetUsers(userId),
                    DataRole = _service.GetDataRole()
                };

                return Ok(model);
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Get User Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
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
                string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (!ModelState.IsValid)
                {
                    Log.Error(("[Update User Error] --> Bad Request"), LogLevel.Error);
                    return BadRequest(ModelState);
                }

                string password = body.Password;
                if (IsBase64String(password) && password.Length > 50) { }
                else
                {
                    password = _passwordHasher.HashPassword(body, body.Password ?? "");
                }
                bool result = _service.UpdateUser(body.UserID, body.Email ?? "", body.UserName ?? "", password, body.Password, body.RoleID);

                if (!result)
                {
                    Log.Error(("[Update User Error] --> Bad Request" + Message.MESS_ERR_UPDATE_USER), LogLevel.Error);
                    return BadRequest(Message.MESS_ERR_UPDATE_USER);
                }

                if (userId == body.UserID.ToString())
                {
                    return Unauthorized();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Update User Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
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
                    Log.Error(("[Delete User Error] --> Bad Request" + Message.MESS_ERR_DELETE_USER), LogLevel.Error);
                    return BadRequest(Message.MESS_ERR_DELETE_USER);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Delete User Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        /// <summary>
        /// Get setting template wbs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetSettingTemplateWBS()
        {
            try
            {
                TemplateWBSModel model = _service.GetSettingTemplateWBS();

                return Ok(model);
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Get Setting Template WBS Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        /// <summary>
        /// Update setting template wbs
        /// </summary>
        /// <param name="body"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult UpdateSettingTemplateWBS(TemplateWBSModel body)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool result = _service.UpdateSettingTemplateWBS(body);

                if (!result)
                {
                    Log.Error(("[Update Setting Template WBS Error] --> " + Message.MESS_ERR_UPDATE_TEMPLATE_WBS), LogLevel.Error);
                    return BadRequest(Message.MESS_ERR_UPDATE_TEMPLATE_WBS);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Update Setting Template WBS Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
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
            try
            {
                // Get data using to WBS
                List<TaskModel> listData = _service.GetDataWBS();

                if (listData.Count == 0)
                {
                    return StatusCode(204);
                }

                // Get setting
                TemplateWBSModel model = _service.GetSettingTemplateWBS();
                TemplateWBSModel modelIndex = new TemplateWBSModel
                {
                    moduleId = model.moduleId,
                    taskName = model.taskName,
                    taskType = model.taskType,
                    assignee = model.assignee,
                    estimatedHour = model.estimatedHour,
                    workHour = model.workHour,
                    dateWorkStart = model.dateWorkStart,
                    dateWorkEnd = model.dateWorkEnd,
                    dateCreate = model.dateCreate,
                    dateDelivery = model.dateDelivery,
                };
                ConvertColumnsToIndexes(modelIndex);

                // Get dictionary type key and name jp
                Dictionary<short, string> dicType = _service.GetDataTaskTypeJP(); ;

                // Create work sheets excel 
                ExcelPackage package = new();
                string currentMonthYear = DateTime.Now.ToString("MMyyyy");
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("WBS_" + currentMonthYear);

                int startIndex = 2, index = 2;
                string moduleId = listData[0].ModuleID;
                string column = model.moduleId.Replace(":M", "");
                foreach (TaskModel item in listData)
                {
                    if (item.Type.HasValue) item.TypeName = dicType[item.Type.Value];

                    // Create row file excel
                    _service.CreateFileWBS(worksheet, index, item, modelIndex);

                    if (item.ModuleID != moduleId && modelIndex.moduleId.Contains(":M"))
                    {
                       
                        if (moduleId != null && startIndex != index - 1)
                        {
                            worksheet.Cells[$"{column}{startIndex}:{column}{index - 1}"].Merge = true;
                        }
                        startIndex = index;
                    }

                    moduleId = item.ModuleID ?? "";
                    index++;
                }

                if (startIndex != index - 1)
                {
                    worksheet.Cells[$"{column}{startIndex}:{column}{index - 1}"].Merge = true;
                }

                // Save file to stream
                var fileStream = new MemoryStream();
                package.SaveAs(fileStream);
                fileStream.Position = 0;

                // Return file wbs to client
                return File(fileStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("[Download File Exception] --> Exception has occurred: {0}", ex.Message), LogLevel.Error);
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        /// <summary>
        /// Convert string teamplate to number
        /// </summary>
        /// <param name="model"></param>
        private void ConvertColumnsToIndexes(TemplateWBSModel model)
        {
            Dictionary<string, string> columnCache = new Dictionary<string, string>();

            foreach (var property in model.GetType().GetProperties())
            {
                if (property.PropertyType == typeof(string))
                {
                    string columnName = (string)property.GetValue(model);
                    if (!string.IsNullOrEmpty(columnName))
                    {
                        // Check exit key model to cache
                        if (!columnCache.ContainsKey(columnName))
                        {
                            columnCache[columnName] = ColumnLetterToIndex(columnName);
                        }

                        // Update value 
                        property.SetValue(model, columnCache[columnName].ToString());
                    }
                }
            }
        }

        /// <summary>
        /// Get column letter to index
        /// </summary>
        /// <param name="column"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public string ColumnLetterToIndex(string column)
        {
            column = column?.ToUpper();
            if (string.IsNullOrEmpty(column)) throw new ArgumentException("Column is empty or null");

            string[] arrColumn = column.Split(':');


            int columnIndex = 0;
            string result = string.Empty;
            foreach (char c in arrColumn[0])
            {
                columnIndex = columnIndex * 26 + (c - 'A' + 1);
            }
            result += columnIndex;

            if (arrColumn.Length == 1) return result;

            if (arrColumn.Length == 2)
            {
                return result + ":M";
            }        

            return result;
        }

        /// <summary>
        /// Check is base 64
        /// </summary>
        /// <param name="base64"></param>
        /// <returns></returns>
        private bool IsBase64String(string base64)
        {
            return (base64.Length % 4 == 0) && Regex.IsMatch(base64, @"^[a-zA-Z0-9\+/]*={0,3}$", RegexOptions.None);
        }
    }
}