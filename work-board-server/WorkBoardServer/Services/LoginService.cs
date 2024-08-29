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

        public IEnumerable<UserModel> Login(string userName, string password)
        {
            return _databaseService.ExecuteQuery<UserModel>("CheckLogin", new { userName = userName, password = password });
        }
    }
}
