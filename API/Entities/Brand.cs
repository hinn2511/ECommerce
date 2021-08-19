using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Brand
    {
        public int Id { get; set; }
        public string BrandName { get; set; }

        [JsonIgnore]
        public ICollection<Product> Products { get; set; }
    }
}