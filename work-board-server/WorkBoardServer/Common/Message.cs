namespace WorkBoardServer.Common
{
    public class Message
    {
        public const string MESS_NO_DATA = "No data available.";

        public const string MESS_ERR_UPDATE_TASK = "Failed to update task.";
        public const string MESS_ERR_UPDATE_TASK_PROGRESS = "Failed to update task progress.";
        public const string MESS_ERR_DELETE_TASK = "Failed to delete task.";
        public const string MESS_ERR_UPDATE_USER = "Failed to update user.";
        public const string MESS_ERR_DELETE_USER = "Failed to delete user.";
        public const string MESS_ERR_TEMPLATE_WBS = "Failed to get setting tempalte wbs.";
        public const string MESS_ERR_UPDATE_TEMPLATE_WBS = "Failed to update setting tempalte wbs.";
        public const string MESS_ERR_USER_WEB_SOCKET = "Web Socket connection not found for the user.";

        public const string NOTI_CREATE_TASK = "The {0} has assigned you a new task with ID {1}, please confirm.";
        public const string NOTI_EDIT_TASK = "The {0} has edited the task with ID {1}, please confirm.";
        public const string NOTI_DELETE_TASK = "The {0} has deleted the task with ID {1}, please confirm.";

        public static string FormatMessage(string messageTemplate, params object[] args)
        {
            return string.Format(messageTemplate, args);
        }
    }
}
