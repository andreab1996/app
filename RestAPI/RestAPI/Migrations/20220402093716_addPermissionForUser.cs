using Microsoft.EntityFrameworkCore.Migrations;

namespace RestAPI.Migrations
{
    public partial class addPermissionForUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Permission",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Permission_UserId",
                table: "Permission",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Permission_User_UserId",
                table: "Permission",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Permission_User_UserId",
                table: "Permission");

            migrationBuilder.DropIndex(
                name: "IX_Permission_UserId",
                table: "Permission");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Permission");
        }
    }
}
