using System.ComponentModel.DataAnnotations;

namespace WorkBoardServer.Models
{
    public class TaskModel
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "Module ID is required.")]
        public string? ModuleID { get; set; }

        public string? TaskName { get; set; }

        [Required(ErrorMessage = "Task Type is required.")]
        public short? Type { get; set; }

        public string? TypeName { get; set; }

        public List<DataListOption>? DataTaskType { get; set; }

        public int? NumRedmine { get; set; }

        [Required(ErrorMessage = "Assignee is required.")]
        public short? Assignee { get; set; }

        public string? AssigneeName { get; set; }

        public List<DataListOption>? DataAssignee { get; set; }

        public short? Priority { get; set; }

        public List<DataListOption>? DataPriority { get; set; }

        [Required(ErrorMessage = "Date Create is required.")]
        public DateTime? DateCreate { get; set; }

        [Required(ErrorMessage = "Estimated Hour is required.")]
        public decimal? EstimatedHour { get; set; }

        [Required(ErrorMessage = "Date Delivery is required.")]
        public DateTime? DateDelivery { get; set; }

        public string? Note { get; set; }

        public DateTime? DateWork { get; set; }

        public decimal? WorkHour { get; set; }

        public int? Progress { get; set; }

        public DateTime? DateWorkStart { get; set; }

        public DateTime? DateWorkEnd { get; set; }

        public short? TaskStatus { get; set; }

        public List<DataListOption>? DataTaskStatus { get; set; }
    }
}