using System.ComponentModel.DataAnnotations;
using WorkBoardServer.Common;

namespace WorkBoardServer.Models
{
    public class UserModel
    {
        public int UserID { get; set; }

        [Required(ErrorMessage = ErrorMessages.RequiredFieldMessage)]
        public string Email { get; set; }

        [Required(ErrorMessage = ErrorMessages.RequiredFieldMessage)]
        public string UserName { get; set; }

        [Required(ErrorMessage = ErrorMessages.RequiredFieldMessage)]
        public string Password { get; set; }

        public int RoleID { get; set; }
    }
}
