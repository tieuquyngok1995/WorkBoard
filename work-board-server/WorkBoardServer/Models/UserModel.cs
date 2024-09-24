using System.ComponentModel.DataAnnotations;

namespace WorkBoardServer.Models
{
    public class UserModel
    {
        public int? UserID { get; set; }

        public string? Email { get; set; }

        [Required(ErrorMessage = "UserName is required.")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }

        public int? RoleID { get; set; }
    }
}
