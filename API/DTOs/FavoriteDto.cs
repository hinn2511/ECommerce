namespace API.DTOs
{
    public class FavoriteProductDto
    {
        public int Id { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string PhotoUrl { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string Brand { get; set; }
        public double Price { get; set; }
    }
}