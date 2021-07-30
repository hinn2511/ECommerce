using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; } = 0;
        public double Price { get; set; }
        public string Introduction { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public ICollection<ProductPhoto> ProductPhotos { get; set; }
    }
}