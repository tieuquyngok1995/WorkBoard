namespace WorkBoardServer.Models
{
    public class TaskModel
    {
        public string ModuleID {  get; set; }

        public string TaskName { get; set; }

        public int TaskType { get; set; }

        public DataListOption[] DataTaskType { get; set; }

        public string NumRedmine { get; set; }

        public string Assignee { get; set; }

        public DataListOption[] DataAssignee { get; set; }

        public int Priority { get; set; }

        public DataListOption[] DataPriority { get; set; }

        public DateTime DateCreate { get; set; }

        public int WorkHour { get; set; }

        public int EstimatedHour { get; set; }

        public int Progress { get; set; }

        public DateTime DateDelivery { get; set; }

        public string Note { get; set; }
    }
}
