using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduling.Migrations
{
    public partial class AddVacationResponses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "VacationRequests");

            //migrationBuilder.CreateTable(
            //    name: "TimerHistories",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        StartTime = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        FinishTime = table.Column<DateTime>(type: "datetime2", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_TimerHistories", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "UserTimerHistories",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        TimerHistoryId = table.Column<int>(type: "int", nullable: false),
            //        UserId = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_UserTimerHistories", x => x.Id);
            //    });

            migrationBuilder.CreateTable(
                name: "VacationResponses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RequestId = table.Column<int>(type: "int", nullable: false),
                    ResponderId = table.Column<int>(type: "int", nullable: false),
                    Response = table.Column<bool>(type: "bit", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VacationResponses", x => x.Id);
                });

            //migrationBuilder.InsertData(
            //    table: "TimerHistories",
            //    columns: new[] { "Id", "FinishTime", "StartTime" },
            //    values: new object[] { 1, new DateTime(2021, 1, 1, 1, 1, 2, 0, DateTimeKind.Unspecified), new DateTime(2021, 1, 1, 1, 1, 1, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 3,
                column: "PermisionId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "PermisionId", "UserId" },
                values: new object[] { 1, 1321314 });

            migrationBuilder.UpdateData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 5,
                column: "UserId",
                value: 1321314);

            migrationBuilder.InsertData(
                table: "UserPermissions",
                columns: new[] { "Id", "PermisionId", "UserId" },
                values: new object[,]
                {
                    { 1, 3, 13213133 },
                    { 2, 1, 1321313 },
                    { 6, 1, 1321315 },
                    { 7, 2, 1321315 }
                });

            //migrationBuilder.InsertData(
            //    table: "UserTimerHistories",
            //    columns: new[] { "Id", "TimerHistoryId", "UserId" },
            //    values: new object[] { 1, 1, 1321313 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1321313,
                columns: new[] { "Department", "Name", "Position", "Surname" },
                values: new object[] { "Nachalstvo", "Denis", "Nachalnik", "Pensiya" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Department", "Email", "Name", "Password", "Position", "Salt", "Surname" },
                values: new object[,]
                {
                    { 1321314, "Nachalstvo", "admin2@gmail.com", "Arkadiy", "5dj3bhWCfxuHmONkBdvFrA==", "Pochti nachalstvo", "91ed90df-3289-4fdf-a927-024b24bea8b7", "Cisterna" },
                    { 1321315, "Nachalstvo", "admin3@gmail.com", "Arkadiy", "5dj3bhWCfxuHmONkBdvFrA==", "Pochti nachalstvo", "91ed90df-3289-4fdf-a927-024b24bea8b7", "Cisterna" }
                });

            migrationBuilder.InsertData(
                table: "VacationResponses",
                columns: new[] { "Id", "Comment", "RequestId", "ResponderId", "Response" },
                values: new object[,]
                {
                    { 1, "No problem. Let`s go!", 1, 1321313, true },
                    { 2, "Oke. Goodbye :(((((((((", 1, 1321314, true },
                    { 3, "Nea. Sidi tut!", 1, 1321315, false }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimerHistories");

            migrationBuilder.DropTable(
                name: "UserTimerHistories");

            migrationBuilder.DropTable(
                name: "VacationResponses");

            migrationBuilder.DeleteData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1321314);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1321315);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "VacationRequests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 3,
                column: "PermisionId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "PermisionId", "UserId" },
                values: new object[] { 3, 13213133 });

            migrationBuilder.UpdateData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 5,
                column: "UserId",
                value: 1321313);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1321313,
                columns: new[] { "Department", "Name", "Position", "Surname" },
                values: new object[] { "Memes", "Admin", "lol", "Adminov" });

            migrationBuilder.UpdateData(
                table: "VacationRequests",
                keyColumn: "Id",
                keyValue: 1,
                column: "Status",
                value: "Declined. Declined by PM. Declined by TL.");

            migrationBuilder.UpdateData(
                table: "VacationRequests",
                keyColumn: "Id",
                keyValue: 2,
                column: "Status",
                value: "Declined. Declined by PM. Declined by TL.");

            migrationBuilder.UpdateData(
                table: "VacationRequests",
                keyColumn: "Id",
                keyValue: 3,
                column: "Status",
                value: "Pending consideration...");
        }
    }
}
