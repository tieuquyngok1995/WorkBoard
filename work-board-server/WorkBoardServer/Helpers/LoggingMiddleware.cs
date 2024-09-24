using Serilog;

namespace WorkBoardServer.Helpers
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public LoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            Log.Information($"Handling request: {context.Request.Method} {context.Request.Path}");

            try
            {
                await _next(context); // Tiếp tục chuỗi middleware
            }
            catch (Exception ex)
            {
                Log.Error($"An error occurred: {ex.Message}");
                throw;
            }

            Log.Information($"Response: {context.Response.StatusCode}");
        }
    }
}