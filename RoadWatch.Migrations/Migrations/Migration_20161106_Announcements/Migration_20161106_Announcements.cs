using FluentMigrator;
using RoadWatch.Migrations.Extensions;

namespace RoadWatch.Migrations.Migrations
{
    [Migration(20161106)]
    public class Migration20161106Announcements : Migration
    {
        public override void Up()
        {
            Create.Table("Announcements")
                .WithId()
                .WithColumn("Title").AsString().NotNullable()
                .WithColumn("Content").AsString().NotNullable()
                .WithAuditInfo();
        }

        public override void Down()
        {
            Execute.DropTableIfExists("Announcements");
        }
    }
}
