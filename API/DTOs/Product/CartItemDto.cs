namespace API.DTOs.Product
{
    public class CartItemDto
    {
        public string ProductCode { get; set; }
        public string ColorCode { get; set; }
        public int Quantity { get; set; }
    }
}