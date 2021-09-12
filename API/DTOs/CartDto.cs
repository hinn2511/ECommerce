namespace API.DTOs
{
    public class CartDto
    {
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string PhotoUrl { get; set; }
        public double Price { get; set; }
        public string ColorCode { get; set; }
        public string ColorName { get; set; }
        public int Quantity { get; set; }
        
    }
}