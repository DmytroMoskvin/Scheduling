using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduling.Migrations
{
    public partial class timerIsModified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_userTeams",
                table: "userTeams");

            migrationBuilder.RenameTable(
                name: "userTeams",
                newName: "UserTeams");

            migrationBuilder.AddColumn<bool>(
                name: "IsModified",
                table: "TimerHistories",
                type: "bit",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTeams",
                table: "UserTeams",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTeams",
                table: "UserTeams");

            migrationBuilder.DropColumn(
                name: "IsModified",
                table: "TimerHistories");

            migrationBuilder.RenameTable(
                name: "UserTeams",
                newName: "userTeams");

            migrationBuilder.AddPrimaryKey(
                name: "PK_userTeams",
                table: "userTeams",
                column: "Id");
        }
    }
}
