using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace WorkBoardServer.Services
{
    public class DatabaseService
    {
        private readonly string _connectionString;

        public DatabaseService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public IDbConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }

        public IEnumerable<T> ExecuteQuery<T>(string storedProcedureName, object parameters = null)
        {
            using (var connection = CreateConnection())
            {
                return connection.Query<T>(storedProcedureName, parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public int ExecuteNonQuery(string storedProcedureName, object parameters = null)
        {
            using (var connection = CreateConnection())
            {
                return connection.Execute(storedProcedureName, parameters, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
