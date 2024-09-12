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

        public UserModel SignIn(string userName, string password)
        {
            return _databaseService.ExecuteQuery<UserModel>(
                GlobalConstants.PSignIn, new
                {
                    userName = userName,
                    password = password
                }).FirstOrDefault() ?? new UserModel();
        }

        public UserModel SignUp(string email, string userName, string password)
        {
            return _databaseService.ExecuteQuery<UserModel>(
                GlobalConstants.PSignUp, new
                {
                    email = email,
                    userName = userName,
                    password = password
                }).FirstOrDefault() ?? new UserModel();
        }
    }
}
