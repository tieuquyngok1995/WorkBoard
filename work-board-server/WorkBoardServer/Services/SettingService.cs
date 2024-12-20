﻿using Dapper;
using MailKit.Security;
using MimeKit;
using OfficeOpenXml;
using WorkBoardServer.Common;
using WorkBoardServer.Models;

namespace WorkBoardServer.Services
{
    public class SettingService
    {
        private readonly DatabaseService _databaseService;

        public SettingService(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public List<DataListOption> GetDataRole()
        {
            return _databaseService.ExecuteQuery<DataListOption>(
                GlobalConstants.GET_ROLE).AsList();
        }

        public List<DataListOption> GetDataAssignee()
        {
            return _databaseService.ExecuteQuery<DataListOption>(
                GlobalConstants.GET_ASSIGNEE).AsList();
        }

        public Dictionary<short, string> GetDataTaskTypeJP()
        {
            return _databaseService.ExecuteQuery<DataListOption>(
                GlobalConstants.GET_TASK_TYPE_JP).ToDictionary(item => item.Key, item => item.Value);
        }

        public List<TemplateSendMailModel> GetTemplateSendMail()
        {
            return _databaseService.ExecuteQuery<TemplateSendMailModel>(
               GlobalConstants.SEND_MAIL_GET_DATA).AsList();
        }

        public List<UserModel> GetUsers(string? userID)
        {
            return _databaseService.ExecuteQuery<UserModel>(
               GlobalConstants.GET_DATA_USER, new { userID }).AsList();
        }

        public List<TaskModel> GetDataWBS()
        {
            return _databaseService.ExecuteQuery<TaskModel>(
                GlobalConstants.GET_DATA_WBS).AsList();
        }

        public bool UpdateUser(int? userID, string email, string userName, string password, string passwordEmail, int? roleID)
        {
            try
            {
                _databaseService.ExecuteQuery<bool>(GlobalConstants.USER_UPDATE, new
                {
                    userID,
                    email,
                    userName,
                    password,
                    passwordEmail,
                    roleID
                });
            }
            catch { return false; }
            return true;
        }

        public bool DeleteUser(int userID)
        {
            try
            {
                _databaseService.ExecuteQuery<bool>(GlobalConstants.USER_DELETE, new
                {
                    userID
                });
            }
            catch { return false; }
            return true;
        }

        public bool CreateTemplateSendMail(string templateName, string subject, string content, string toUser)
        {
            try
            {
                _databaseService.ExecuteQuery<bool>(GlobalConstants.SEND_MAIL_CREATE, new
                {
                    templateName,
                    subject,
                    content,
                    toUser
                });
            }
            catch { return false; }
            return true;
        }

        public bool UpdateTemplateSendMail(short? templateID, string subject, string content, string toUser)
        {
            try
            {
                _databaseService.ExecuteQuery<bool>(GlobalConstants.SEND_MAIL_UPDATE, new
                {
                    templateID,
                    subject,
                    content,
                    toUser
                });
            }
            catch { return false; }
            return true;
        }

        public void SendMail(string email, string password, TemplateSendMailModel body)
        {
            List<string> listEmail = GetEmailFromUser(body.ToUser);
            listEmail.RemoveAll(user => user == email);

            MimeMessage mimeMessage = new();

            mimeMessage.From.Add(new MailboxAddress("Work Board Management", email));
            mimeMessage.To.AddRange(listEmail.Select(email => new MailboxAddress("Receiver Name", email)));

            mimeMessage.Subject = "[WorkBoard] " + body.Subject;
            mimeMessage.Body = new TextPart(MimeKit.Text.TextFormat.Plain)
            {
                Text = body.Content
            };

            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                client.Connect("mail.fujinet.net", 25, SecureSocketOptions.None);
                client.Authenticate(new SaslMechanismLogin(email, password));
                client.Send(mimeMessage);
                client.Disconnect(true);
            }
        }

        private List<string> GetEmailFromUser(string listUserID)
        {
            return _databaseService.ExecuteQuery<string>(
             GlobalConstants.SEND_MAIL_GET_EMAIL, new { listUserID }).AsList();
        }

        public void CreateFileWBS(ExcelWorksheet worksheet, int row, TaskModel model)
        {
            // Column B: ID module
            worksheet.Cells[row, 2].Value = model.ModuleID;
            // Column D: Task Name
            worksheet.Cells[row, 4].Value = model.TaskName;
            // Column E: Task Type
            worksheet.Cells[row, 5].Value = model.TypeName;

            // Column G: Assignee
            worksheet.Cells[row, 6].Value = model.Assignee;

            // Column M: Estimated Hour
            worksheet.Cells[row, 13].Value = model.EstimatedHour.HasValue ? double.Parse(Math.Round(model.EstimatedHour.Value, 2).ToString("0.##")) : 0.0; ;
            // Column N: Work Hour
            worksheet.Cells[row, 15].Value = model.WorkHour.HasValue ? double.Parse(Math.Round(model.WorkHour.Value, 2).ToString("0.##")) : 0.0;

            // Column Q: Date Work Start
            worksheet.Cells[row, 17].Value = model.DateWorkStart.HasValue ? model.DateWorkStart.Value.ToString("yyyy/MM/dd") : string.Empty;
            // Column R: Date Work End
            worksheet.Cells[row, 18].Value = model.DateWorkEnd.HasValue ? model.DateWorkEnd.Value.ToString("yyyy/MM/dd") : string.Empty;

            // Column S: Date Create
            worksheet.Cells[row, 19].Value = model.DateCreate.HasValue ? model.DateCreate.Value.ToString("yyyy/MM/dd") : string.Empty;
            // Column T: Date Delivery
            worksheet.Cells[row, 20].Value = model.DateDelivery.HasValue ? model.DateDelivery.Value.ToString("yyyy/MM/dd") : string.Empty;

        }
    }
}