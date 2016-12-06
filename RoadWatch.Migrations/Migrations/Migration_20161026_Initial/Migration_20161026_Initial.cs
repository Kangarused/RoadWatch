using FluentMigrator;
using RoadWatch.Migrations.Extensions;

namespace RoadWatch.Migrations.Migrations.Migration_20161026_Initial
{
    [Migration(20161026)]
    public class Migration20161026Initial : Migration
    {
        public override void Up()
        {
            Create.Table("AuthClient")
                .WithId()
                .WithColumn("Name").AsString().NotNullable()
                .WithColumn("ApplicationType").AsString().NotNullable()
                .WithColumn("Active").AsBoolean().WithDefaultValue(0).NotNullable()
                .WithColumn("AllowedOrigin").AsString().NotNullable();

            Create.Table("Users")
                .WithId()
                .WithColumn("Name").AsString().NotNullable()
                .WithColumn("Email").AsString().NotNullable();

            Create.Index("UQ_User_Email").OnTable("Users").OnColumn("Email").Unique();

            Create.Table("UserCredentials")
                .WithId()
                .WithColumn("UserId").AsInt32().ForeignKey("Users", "Id").NotNullable()
                .WithColumn("WindowsUsername").AsString().Nullable();

            Create.UniqueConstraint("UQ_UserCredentials_WindowsUsername").OnTable("UserCredentials").Column("WindowsUsername");

            Create.Table("UserRoles")
            .WithId()
            .WithColumn("UserId").AsInt32().ForeignKey("Users", "Id").NotNullable()
            .WithColumn("Role").AsString().NotNullable();

            Create.Table("Audit")
                .WithId()
                .WithColumn("EntityType").AsString(255).NotNullable()
                .WithColumn("Key").AsInt32().NotNullable()
                .WithColumn("Operation").AsString(255).NotNullable()
                .WithColumn("Serialised").AsMaxString().NotNullable()
                .WithColumn("User").AsString(255).NotNullable()
                .WithColumn("Ip").AsString(255).NotNullable()
                .WithColumn("TransactionId").AsInt32().Nullable()
                .WithColumn("DateTime").AsDateTime().NotNullable();

            Create.Table("RoadConditions")
                .WithId()
                .WithColumn("MarkerId").AsInt32().NotNullable()
                .WithColumn("RoadConditionType").AsString().NotNullable()
                .WithColumn("Condition").AsString().Nullable()
                .WithColumn("Duration").AsString().Nullable()
                .WithColumn("ConditionEffects").AsMaxString().Nullable()
                .WithColumn("Road").AsString().NotNullable()
                .WithColumn("Area").AsString().NotNullable()
                .WithColumn("AdditionalInformation").AsMaxString().Nullable()
                .WithColumn("MapObject").AsMaxString().Nullable()
                .WithAuditInfo();

            Create.Table("PublicReports")
                .WithId()
                .WithColumn("RoadConditionType").AsString().NotNullable()
                .WithColumn("Condition").AsString().Nullable()
                .WithColumn("Road").AsString().NotNullable()
                .WithColumn("Area").AsString().NotNullable()
                .WithColumn("AdditionalInformation").AsMaxString().Nullable()
                .WithColumn("ContactName").AsString().Nullable()
                .WithColumn("ContactEmail").AsString().Nullable()
                .WithColumn("ContactPhone").AsString().Nullable()
                .WithColumn("ReportDate").AsDateTime().NotNullable();
        }

        public override void Down()
        {
            Execute.DropTableIfExists("PublicReports");
            Execute.DropTableIfExists("RoadConditions");
            Execute.DropTableIfExists("Audit");
            Execute.DropTableIfExists("UserRoles");
            Execute.DropTableIfExists("UserCredentials");
            Execute.DropTableIfExists("Users");
            Execute.DropTableIfExists("AuthClient");
        }
    }
}
