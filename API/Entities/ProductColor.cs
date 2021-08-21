using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class ProductColor
    {
        public int ProductId { get; set; }
        
        [JsonIgnore]
        public Product Product { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }
        public int Quantity { get; set; }
    }
}