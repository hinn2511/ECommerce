using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string PhotoUrl { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string Introduction { get; set; }
        public ICollection<ProductPhotoDto> ProductPhotos { get; set; }
    }
}