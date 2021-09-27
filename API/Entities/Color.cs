using System.Collections.Generic;

namespace API.Entities
{
    public class Color
    {
        public int Id { get; set; }
        public string HexCode { get; set; }
        public string ColorCode { get; set; }
        public string ColorName { get; set; }
        public ICollection<ProductColor> ProductColors { get; set; }
        public ICollection<Cart> Carts { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        
    }
}