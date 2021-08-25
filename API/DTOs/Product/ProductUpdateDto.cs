namespace API.DTOs
{
    public class ProductUpdateDto
    {
        public int Id { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string Material { get; set; }
        public int Height { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Weight { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
         public int CollectionId { get; set; }
        public double Price { get; set; }
        public string Introduction { get; set; }
    }
}