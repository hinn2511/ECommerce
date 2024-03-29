
namespace API.Entities
{
    public class Cart
    {
        public AppUser Customer { get; set; }
        public int CustomerId { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public Color Color { get; set; }
        public int? ColorId { get; set; }
        public int Quantity { get; set; }
    }
}