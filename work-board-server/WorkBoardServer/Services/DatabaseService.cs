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
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? "";
        }

        public SqlConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }

        public IEnumerable<T> ExecuteQuery<T>(string storedProcedureName, object? parameters = null)
        {
            using var connection = CreateConnection();
            return connection.Query<T>(storedProcedureName, parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<IEnumerable<T>> ExecuteQueryAsync<T>(string storedProcedureName, object? parameters = null)
        {
            using var connection = CreateConnection();
            return await connection.QueryAsync<T>(storedProcedureName, parameters, commandType: CommandType.StoredProcedure);
        }


        public int ExecuteNonQuery(string storedProcedureName, object? parameters = null, int? timeout = null)
        {
            using SqlConnection connection = CreateConnection();
            using var command = new SqlCommand(storedProcedureName, connection);
            command.CommandType = CommandType.StoredProcedure;

            if (parameters is not null)
            {
                command.Parameters.AddRange(new[] { parameters });
            }

            if (timeout.HasValue)
            {
                command.CommandTimeout = timeout.Value;
            }

            connection.Open();
            return command.ExecuteNonQuery();
        }

        public int ExecuteNonQueryGetID(string storedProcedureName, string output, object? parameters = null, int? timeout = null)
        {
            using SqlConnection connection = CreateConnection();
            connection.Open();

            using var command = new SqlCommand(storedProcedureName, connection);
            command.CommandType = CommandType.StoredProcedure;

            if (parameters is not null)
            {
                command.Parameters.AddRange(new[] { parameters });
            }

            if (timeout.HasValue)
            {
                command.CommandTimeout = timeout.Value;
            }

            var outputParameter = new SqlParameter(output, SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };
            command.Parameters.Add(outputParameter);

            command.ExecuteNonQuery();

            int newId = (int)outputParameter.Value;

            if (newId < 0) throw new Exception("No rows were affected.");

            return newId;
        }
    }
}
