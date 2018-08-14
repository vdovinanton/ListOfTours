using Microsoft.EntityFrameworkCore.Migrations;

namespace ListOfTours.Repository.Migrations
{
    public partial class removedVirtual : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StandardRefId",
                table: "ExcursionSights");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StandardRefId",
                table: "ExcursionSights",
                nullable: false,
                defaultValue: 0);
        }
    }
}
