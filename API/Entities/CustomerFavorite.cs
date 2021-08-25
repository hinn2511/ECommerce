namespace API.Entities
{
    public class CustomerFavorite
    {
        public AppUser Customer { get; set; }
        public int CustomerId { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }

    }
}