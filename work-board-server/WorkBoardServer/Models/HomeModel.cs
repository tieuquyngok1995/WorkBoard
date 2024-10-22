namespace WorkBoardServer.Models
{
    public class HomeModel
    {
        public required TaskModel TaskDialog { get; set; }

        public required List<TaskModel> ListTasks { get; set; }
    }
}