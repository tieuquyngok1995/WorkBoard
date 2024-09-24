using System.Data;

namespace WorkBoardServer.Helpers
{
    public static class SqlHelper
    {
        public static DataTable ToDataTable<T>(this IEnumerable<T> source) where T : class
        {
            return source.ToDataTable(typeof(T).Name);
        }

        /// <summary>
        /// DataTableを返します。
        /// </summary>
        /// <param name="source"></param>
        /// <param name="tableName"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        public static DataTable ToDataTable<T>(this IEnumerable<T> source, string tableName) where T : class
        {

            var type = typeof(T);

            System.Reflection.PropertyInfo[] props = type.GetProperties().Where(x => x.CanRead).ToArray();

            var table = new DataTable(tableName);

            foreach (var prop in props)
            {
                var pType = Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType;
                table.Columns.Add(prop.Name, pType.IsEnum ? pType.GetEnumUnderlyingType() : pType);
            }

            if (source is not null)
            {

                table.BeginLoadData();

                foreach (var item in source)
                    table.Rows.Add(props.Select(x => x.GetValue(item, null)).ToArray());

                table.EndLoadData();
                table.AcceptChanges();

            }

            return table;
        }
    }
}
