using FluentMigrator;
using FluentMigrator.Runner.Extensions;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Migrations.Profiles.Models;

namespace RoadWatch.Migrations.Profiles
{
    [Profile("Development")]
    public class DevelopmentProfile : Migration
    {
        public override void Up()
        {
            AddTestProfiles();
            LoadAuthClients();
        }

        public override void Down()
        {
            
        }

        private readonly MockUser _publicUser = new MockUser()
        {
            Id = 1,
            Name = Faker.Name.FullName(),
            Email = Faker.Internet.Email()
        };

        private void AddTestProfiles()
        {
            //Insert Public User
            Insert.IntoTable("Users").WithIdentityInsert().Row(new
            {
                _publicUser.Id,
                _publicUser.Name,
                _publicUser.Email
            });

            //Add Credentials
            Insert.IntoTable("UserCredentials").Row(new
            {
                UserId = _publicUser.Id,
                WindowsUsername = "Kangarused"
            });

            //Add UserRole
            Insert.IntoTable("UserRoles").Row(new
            {
                UserId = _publicUser.Id,
                Role = Role.SystemAdministrator
            });
        }

        private void LoadAuthClients()
        {
            Insert.IntoTable("AuthClient").Row(new
            {
                Name = "websiteAuth",
                ApplicationType = "AngularJS front-end Application",
                Active = true,
                AllowedOrigin = "http://austraffix.com"
            });
        }
    }
}
