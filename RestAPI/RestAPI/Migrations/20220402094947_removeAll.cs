using Microsoft.EntityFrameworkCore.Migrations;

namespace RestAPI.Migrations
{
    public partial class removeAll : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
