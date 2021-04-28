using GraphQL.Server;
using GraphQL.Types;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Scheduling.Domain;
using Scheduling.GraphQl;
using Scheduling.GraphQl.Types;
using Scheduling.Services;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Scheduling.Models;

namespace Scheduling
{
    
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddDbContext<UserDBContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudience = "audience",
                    ValidIssuer = "issuer",
                    RequireSignedTokens = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("SecretKey").Value))
                };

                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
            });


            services.AddGraphQL(options =>
            {
                options.EnableMetrics = true;
            })
               .AddErrorInfoProvider(opt => opt.ExposeExceptionStackTrace = true)
               .AddSystemTextJson()
               .AddGraphQLAuthorization(options =>
               {
                   options.AddPolicy("Authenticated", p => p.RequireAuthenticatedUser());
                   options.AddPolicy(PermissionName.VacationApprovals.ToString(), p => p.RequireClaim("permission", "Access to vacation approvals"));
                   options.AddPolicy("Part-time", p => p.RequireClaim("permission", "Part-time"));
                   options.AddPolicy("Full-time", p => p.RequireClaim("permission", "Full-time"));
                   options.AddPolicy("Accountant", p => p.RequireClaim("permission", "Accountant"));
                   options.AddPolicy("Access to team management", p => p.RequireClaim("permission", "Access to team management"));
                   options.AddPolicy("Access to global management", p => p.RequireClaim("permission", "Access to global management"));
               });

            services.AddScoped<IdentityService>();
            services.AddScoped<EmailService>();
            services.AddScoped<DataBaseRepository>();
            services.AddHttpContextAccessor();

            services.AddScoped<Querys>();
            services.AddScoped<Mutations>();
            services.AddScoped<UserType>();
            services.AddScoped<PermissionType>();
            services.AddScoped<TeamType>();
            services.AddScoped<ComputedPropsType>();
            services.AddScoped<VacationRequestType>();
            services.AddScoped<PermissionNameEnum>();

            services.AddScoped<ISchema, GraphSchema>();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");

                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseAuthentication();

            app.UseRouting();

            app.UseGraphQL<ISchema>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
