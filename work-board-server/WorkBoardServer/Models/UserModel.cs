using System.ComponentModel.DataAnnotations;

namespace WorkBoardServer.Models
{
    public class UserListModel
    {
        public List<DataListOption>? DataRole { get; set; }

        public List<UserModel>? Users { get; set; }
    }

    public class UserModel
    {
        public int? UserID { get; set; }

        public string? Email { get; set; }

        [Required(ErrorMessage = "UserName is required.")]
        public string? UserName { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string? Password { get; set; }

        public string? PasswordEmail { get; set; }

        public int? RoleID { get; set; }

        public string? RoleName { get; set; }

        public string? Token { get; set; }
    }
}