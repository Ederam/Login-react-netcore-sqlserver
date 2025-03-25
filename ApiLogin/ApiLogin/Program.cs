using ApiLogin.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using System.Configuration;
using System.Drawing;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
//uso de la clase de context para poder utilizarla en la aplicacion
//builder.Services.AddDbContext<AppDbContext>(options => builder.Configuration.GetConnectionString("ConexionBD"));

builder.Services.AddDbContext<AppDbContext>(cfg =>
{
    cfg.UseSqlServer(builder.Configuration.GetConnectionString("ConexionBD"));
});

//services.AddTransient<IMyLogger, MyLogger>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
