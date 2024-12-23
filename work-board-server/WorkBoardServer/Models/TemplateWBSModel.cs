using System.ComponentModel.DataAnnotations;

namespace WorkBoardServer.Models
{
    public class TemplateWBSModel
    {
        [Required(ErrorMessage = "Module ID is required.")]
        public string? moduleId { get; set; }

        [Required(ErrorMessage = "Task Name is required.")]
        public string? taskName { get; set; }

        [Required(ErrorMessage = "Task Type is required.")]
        public string? taskType { get; set; }

        [Required(ErrorMessage = "Assignee is required.")]
        public string? assignee { get; set; }

        [Required(ErrorMessage = "Estimated Hour is required.")]
        public string? estimatedHour { get; set; }

        [Required(ErrorMessage = "Work hour is required.")]
        public string? workHour { get; set; }

        [Required(ErrorMessage = "Date work start is required.")]
        public string? dateWorkStart { get; set; }

        [Required(ErrorMessage = "Date work end is required.")]
        public string? dateWorkEnd { get; set; }

        [Required(ErrorMessage = "Date create is required.")]
        public string? dateCreate { get; set; }

        [Required(ErrorMessage = "Date delivery is required.")]
        public string? dateDelivery { get; set; }
    }
}
