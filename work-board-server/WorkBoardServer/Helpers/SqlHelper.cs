using Microsoft.Data.SqlClient.Server;

namespace WorkBoardServer.Helpers
{
    public class SqlHelper
    {
        public static void SetNullValue(SqlDataRecord record, int ordinal, string val)
        {
            if (string.IsNullOrEmpty(val))
            {
                record.SetDBNull(ordinal);
            }
            else
            {
                record.SetString(ordinal, val);
            }
        }

        internal static void SetNoteValue(SqlDataRecord record, int v, string? note)
        {
            throw new NotImplementedException();
        }
    }
}
