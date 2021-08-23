using System.Collections.Generic;

namespace API.Entities
{
    public class SubCategory
    {
        public int Id { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}