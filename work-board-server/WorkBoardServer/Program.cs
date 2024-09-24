using Serilog;
using System.Reflection;
using WorkBoardServer.Helpers;
using WorkBoardServer.Services;

var builder = WebApplication.CreateBuilder(args);

var assembly = Assembly.GetExecutingAssembly();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Find class Service
var appServices = assembly.GetTypes().Where(x => x.Name.EndsWith("Service")).ToArray();

foreach (var service in appServices)
{
    builder.Services.AddScoped(service);
}

// Serilog
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.File($"logs/log-.txt", rollingInterval: RollingInterval.Day) // Ghi log ra file
    .CreateLogger();

// 
builder.Host.UseSerilog();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("https://localhost:4200")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials(); // Optional
        });
});

builder.Services.AddSingleton<DatabaseService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Apply the CORS policy
app.UseCors("AllowSpecificOrigin");

app.UseSerilogRequestLogging();

app.UseMiddleware<LoggingMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
