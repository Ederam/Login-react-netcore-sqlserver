using ApiLogin.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using System.Configuration;
using System.Drawing;
using System.Security.Policy;

var builder = WebApplication.CreateBuilder(args);

// configuracion cors
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";


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

////Agregar cors
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("NewPolicy", app =>
//    {
//        app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000/");
//    });
//});

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: MyAllowSpecificOrigins,
//                      policy =>
//                      {
//                          policy.WithOrigins("http://localhost:3000/").AllowAnyHeader()
//                                                  .AllowAnyMethod(); 
//                      });
//});

//Configuracion CORS
//builder.Services.AddCors(options =>
//{
//    options.AddDefaultPolicy(
//        builder =>
//        {
//            builder.WithOrigins(
//                "https://apirequest.io",
//                "https://resttesttest.com"
//                )
//            .SetIsOriginAllowed(origin => new Url(origin).Host == "localhost")
//            .AllowAnyMethod()
//            .AllowAnyHeader();
//        });
//});

//Adicionando Cors
builder.Services.AddCors(policyBuilder =>
    policyBuilder.AddDefaultPolicy(policy =>
        policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod())
);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseCors();
//app.UseCors("NewPolicy");
//app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapControllers();

app.Run();
