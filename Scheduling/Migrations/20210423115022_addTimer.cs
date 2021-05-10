using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduling.Migrations
{
    public partial class addTimer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TimerHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FinishTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimerHistories", x => x.Id);
                });

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
                table: "TimerHistories",
                columns: new[] { "Id", "FinishTime", "StartTime" },
                values: new object[] { 1, new DateTime(2021, 1, 1, 1, 1, 2, 0, DateTimeKind.Unspecified), new DateTime(2021, 1, 1, 1, 1, 1, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "UserTimerHistories",
                columns: new[] { "Id", "TimerHistoryId", "UserId" },
                values: new object[] { 1, 1, 1321313 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimerHistories");

            migrationBuilder.DropTable(
                name: "UserTimerHistories");
        }
    }
}
