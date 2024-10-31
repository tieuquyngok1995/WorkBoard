using System.ComponentModel.DataAnnotations;

namespace WorkBoardServer.Models
{
    public class TemplateSendMailListModel
    {
        public List<DataListOption>? DataTemplate { get; set; }

        public List<DataListOption>? DataToUser { get; set; }

        public List<TemplateSendMailModel>? Templates { get; set; }
    }

    public class TemplateSendMailModel
    {
        public short? TemplateID { get; set; }

        public string? TemplateName { get; set; }

        [Required(ErrorMessage = "Subject is required.")]
        public string? Subject { get; set; }

        [Required(ErrorMessage = "Content is required.")]
        public string? Content { get; set; }

        [Required(ErrorMessage = "To user is required.")]
        public string? ToUser { get; set; }
    }
}
