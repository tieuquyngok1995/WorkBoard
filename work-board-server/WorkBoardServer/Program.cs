using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using OfficeOpenXml;
using Serilog;
using System.Reflection;
using System.Text;
using WorkBoardServer.Helpers;
using WorkBoardServer.Services;

var builder = WebApplication.CreateBuilder(args);

var assembly = Assembly.GetExecutingAssembly();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Find class Service
var appServices = assembly.GetTypes().Where(x => x.Name.EndsWith("Service")).ToArray();

// LicenseContext EPPlus
ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

foreach (var service in appServices)
{
    builder.Services.AddScoped(service);
}

builder.Services.AddSingleton<ICustomWebSocketManager, CustomWebSocketManager>();
builder.Services.AddHttpContextAccessor();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://172.16.7.66:9600")
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? ""))
    };
});

// Serilog
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.File($"logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

// 
builder.Host.UseSerilog();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<DatabaseService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseWebSockets(new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromSeconds(120)
});

app.UseHttpsRedirection();

// Apply the CORS policy
app.UseCors("AllowSpecificOrigin");
app.UseRouting();

app.UseMiddleware<LoggingMiddleware>();
app.UseMiddleware<TokenValidationMiddleware>();

app.UseSerilogRequestLogging();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
