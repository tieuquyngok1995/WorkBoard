using WorkBoardServer.Common;
using WorkBoardServer.Models;

namespace WorkBoardServer.Services
{
    public class LoginService
    {
        private readonly DatabaseService _databaseService;

        public LoginService(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public UserModel SignIn(string userName)
        {
            return _databaseService.ExecuteQuery<UserModel>(
                GlobalConstants.SIGN_IN, new
                {
                    userName
                }).FirstOrDefault() ?? new UserModel();
        }

        public UserModel SignUp(string email, string userName, string password, string passwordEmail)
        {
            return _databaseService.ExecuteQuery<UserModel>(
                GlobalConstants.SIGN_UP, new
                {
                    email,
                    userName,
                    password,
                    passwordEmail
                }).FirstOrDefault() ?? new UserModel();
        }
    }
}