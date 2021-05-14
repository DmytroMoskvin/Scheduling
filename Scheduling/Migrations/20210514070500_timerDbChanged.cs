using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduling.Migrations
{
    public partial class timerDbChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserTimerHistories");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "TimerHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TimerHistories");

            migrationBuilder.CreateTable(
                name: "UserTimerHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TimerHistoryId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTimerHistories", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "UserTimerHistories",
                columns: new[] { "Id", "TimerHistoryId", "UserId" },
                values: new object[] { 1, 1, 1321313 });
        }
    }
}
