using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class DeleteProductArticle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Articles_ProductArticleId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductArticleId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductArticleId",
                table: "Products");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductArticleId",
                table: "Products",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductArticleId",
                table: "Products",
                column: "ProductArticleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Articles_ProductArticleId",
                table: "Products",
                column: "ProductArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
