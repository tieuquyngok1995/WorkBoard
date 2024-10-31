namespace WorkBoardServer.Common
{
    public class GlobalConstants
    {
        // Login
        public const string SIGN_IN = "usp_SignIn";
        public const string SIGN_UP = "usp_SignUp";

        // Task
        public const string TASK_CREATE = "usp_CreateTask";
        public const string TASK_UPDATE = "usp_UpdateTask";
        public const string TASK_UPDATE_STATUS = "usp_UpdateTaskStatus";
        public const string TASK_UPDATE_PROGRESS = "usp_UpdateTaskProgress";
        public const string TASK_DELETE = "usp_DeleteTask";

        // TemplateSendMail
        public const string SEND_MAIL_GET_DATA = "usp_GetTemplateSendMail";
        public const string SEND_MAIL_CREATE = "usp_CreateTemplateSendMail";
        public const string SEND_MAIL_UPDATE = "usp_UpdateTemplateSendMail";

        // User
        public const string USER_UPDATE = "usp_UpdateUser";
        public const string USER_DELETE = "usp_DeleteUser";

        // Home
        public const string GET_TASK = "usp_GetTask";
        public const string GET_TASK_TYPE = "usp_GetTaskType";
        public const string GET_TASK_TYPE_JP = "usp_GetTaskTypeJP";
        public const string GET_TASK_STATUS = "usp_GetTaskStatus";
        public const string GET_ROLE = "usp_GetRole";
        public const string GET_ASSIGNEE = "usp_GetAssignee";
        public const string GET_PRIORITY = "usp_GetPriority";
        public const string GET_DATA_USER = "usp_GetUser";
        public const string GET_DATA_WBS = "usp_GetDataWBS";
    }
}
