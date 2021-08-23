using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        
        [JsonIgnore]
        public ICollection<Product> Products { get; set; }
        public ICollection<SubCategory> SubCategories { get; set; }
    }
}