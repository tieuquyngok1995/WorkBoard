namespace WorkBoardServer.Models
{
    public class HomeModel
    {
        public TaskModel taskDialog { get; set; }

        public List<TaskModel> listTasks { get; set; }
    }
}