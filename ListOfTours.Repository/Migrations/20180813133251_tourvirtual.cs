using Microsoft.EntityFrameworkCore.Migrations;

namespace ListOfTours.Repository.Migrations
{
    public partial class tourvirtual : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StandardRefId",
                table: "ExcursionSights",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StandardRefId",
                table: "ExcursionSights");
        }
    }
}
