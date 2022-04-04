using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RestAPI.Models;
using Microsoft.EntityFrameworkCore;
using RestAPI.Services;

namespace RestAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddMvc();
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
            });
            services.AddScoped<IPermissionService, PermissionService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserPermissionService, UserPermissionService>();
            services.AddAutoMapper(typeof(APIMapperProfile));
            services
                    .AddDbContext<AppDbContext>(options =>
                        options.UseSqlServer(Configuration.GetConnectionString("Default")).EnableSensitiveDataLogging()


            //services.AddDbContext<AppDbContext>(
            // options => options.UseSqlServer(Configuration.GetConnectionString("Default")).EnableSensitiveDataLogging()
         );

            //services.AddDbContext<AppDbContext>(opt =>
            //        opt.UseInMemoryDatabase("TodoList"));
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "RestAPI", Version = "v1" });
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseSwagger();
                //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RestAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
            //app.UseCors(cfg =>
            //{
            //    cfg.WithOrigins("https://localhost:44314/")
            //    .AllowCredentials()
            //    .AllowAnyMethod()
            //    .AllowAnyHeader()
            //    .AllowCredentials();
            //});
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:44314/"));

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
