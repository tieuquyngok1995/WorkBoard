using System.ComponentModel.DataAnnotations;

namespace WorkBoardServer.Models
{
    public class TaskModel
    {
        [Required(ErrorMessage = "Module ID is required.")]
        public string ModuleID { get; set; }

        public string? TaskName { get; set; }

        [Required(ErrorMessage = "Task Type is required.")]
        public int TaskType { get; set; }

        public DataListOption[]? DataTaskType { get; set; }

        public string? NumRedmine { get; set; }

        [Required(ErrorMessage = "Assignee is required.")]
        public string Assignee { get; set; }

        public DataListOption[]? DataAssignee { get; set; }

        public int? Priority { get; set; }

        public DataListOption[]? DataPriority { get; set; }

        [Required(ErrorMessage = "Date Create is required.")]
        public DateTime DateCreate { get; set; }

        public int? WorkHour { get; set; }

        [Required(ErrorMessage = "Estimated Hour is required.")]
        public int EstimatedHour { get; set; }

        public int? Progress { get; set; }

        [Required(ErrorMessage = "Date Delivery is required.")]
        public DateTime DateDelivery { get; set; }

        public string? Note { get; set; }
    }
}
