using Microsoft.EntityFrameworkCore.Migrations;

namespace ListOfTours.Repository.Migrations
{
    public partial class addedExcursionSight3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ExcursionSights_OrderIndex",
                table: "ExcursionSights");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ExcursionSights_OrderIndex",
                table: "ExcursionSights",
                column: "OrderIndex",
                unique: true);
        }
    }
}
