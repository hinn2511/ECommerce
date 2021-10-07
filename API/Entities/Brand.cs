using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Brand
    {
        public int Id { get; set; }
        public string BrandName { get; set; }
        public ICollection<Product> Products { get; set; }
        public string LogoUrl { get; set; }
    }
}