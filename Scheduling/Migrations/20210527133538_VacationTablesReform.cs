using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduling.Migrations
{
    public partial class VacationTablesReform : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "VacationRequests",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "VacationRequests",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "VacationRequests",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "VacationResponses",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "VacationResponses",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "VacationResponses",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.AddColumn<string>(
                name: "ResponderName",
                table: "VacationResponses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "VacationRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "VacationRequests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "VacationRequests",
                columns: new[] { "Id", "Comment", "FinishDate", "StartDate", "Status", "UserId", "UserName" },
                values: new object[,]
                {
                    { 15001, "I want to see a bober.", new DateTime(2021, 5, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 4, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 13213133, "Yarik Obichniy" },
                    { 15002, "I really want to see a bober.", new DateTime(2021, 4, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 4, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 13213133, "Yarik Obichniy" },
                    { 15003, "Please, it`s my dream to see a bober.", new DateTime(2021, 4, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 4, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 13213133, "Yarik Obichniy" }
                });

            migrationBuilder.InsertData(
                table: "VacationResponses",
                columns: new[] { "Id", "Comment", "RequestId", "ResponderId", "ResponderName", "Response" },
                values: new object[,]
                {
                    { 6001, "No problem. Let`s go!", 15001, 1321313, "Denis Pensiya", true },
                    { 6002, "Oke. Goodbye :(((((((((", 15001, 1321314, "Arkadiy Cisterna", true },
                    { 6003, "Nea. Sidi tut!", 15001, 1321315, "Tolik Balkon", false }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "VacationRequests",
                keyColumn: "Id",
                keyValue: 15001);

            migrationBuilder.DeleteData(
                table: "VacationRequests",
                keyColumn: "Id",
                keyValue: 15002);

            migrationBuilder.DeleteData(
                table: "VacationRequests",
                keyColumn: "Id",
                keyValue: 15003);

            migrationBuilder.DeleteData(
                table: "VacationResponses",
                keyColumn: "Id",
                keyValue: 6001);

            migrationBuilder.DeleteData(
                table: "VacationResponses",
                keyColumn: "Id",
                keyValue: 6002);

            migrationBuilder.DeleteData(
                table: "VacationResponses",
                keyColumn: "Id",
                keyValue: 6003);

            migrationBuilder.DropColumn(
                name: "ResponderName",
                table: "VacationResponses");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "VacationRequests");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "VacationRequests");

            migrationBuilder.InsertData(
                table: "VacationRequests",
                columns: new[] { "Id", "Comment", "FinishDate", "StartDate", "UserId" },
                values: new object[,]
                {
                    { 1, "I want to see a bober.", new DateTime(2021, 5, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 4, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 13213133 },
                    { 2, "I really want to see a bober.", new DateTime(2021, 4, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 4, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 13213133 },
                    { 3, "Please, it`s my dream to see a bober.", new DateTime(2021, 4, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 4, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 13213133 }
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
    }
}
