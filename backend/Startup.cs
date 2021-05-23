using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Text;

namespace Bushware
{
    public class Startup
    {
        private static bool devMode = false;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var jwt = new BasicJwtService(Encoding.UTF8.GetBytes(Configuration["JWT:Encryptionkey"]), Configuration["Jwt:Issuer"]);
            services.AddSingleton<IJwtService>(jwt);

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder => builder
                               .AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod());
            });

            services.AddDbContext<DeliveryDBContext>(opt =>
                                               opt.UseSqlServer(@"Server = tcp:delivery - server.database.windows.net, 1433; " +
                                                "Initial Catalog=delivery_db;Persist Security Info=False;User ID=delivery_admin;" +
                                                "Password=Bushware123;MultipleActiveResultSets=False;Encrypt=True;" +
                                                "TrustServerCertificate=False;Connection Timeout=30;"));

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Bushware", Version = "v1" });
            });

            services.AddAuthentication((s) =>
            {
                s.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                s.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = !devMode;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = jwt.TokenValidationParameters;
            });

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("user", policy => policy.RequireRole("user"));
                opt.AddPolicy("admin", policy => policy.RequireRole("admin"));
                opt.AddPolicy("courier", policy => policy.RequireRole("courier"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            devMode = env.IsDevelopment();

            if (devMode)
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Bushware v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
