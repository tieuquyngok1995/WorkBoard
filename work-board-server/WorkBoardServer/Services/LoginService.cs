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

        public IEnumerable<bool> Login(LoginModel model)
        {
            return _databaseService.ExecuteQuery<bool>("", model);
        }
    }
}
