using Microsoft.EntityFrameworkCore;
using Model.Entities;
using Service;

var builder = WebApplication.CreateBuilder(args);
//var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyAllowAll", p =>
    {
        p.AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed((host) => true)
        .AllowCredentials();
    });
});

var builderConfig = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
var configuration = builderConfig.Build();

builder.Services.AddDbContext<ApiContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
//builder.Services.AddDbContext<ApiContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddScoped<INhacService, NhacService>();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("MyAllowAll");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

//app.UseCors(c => c.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
