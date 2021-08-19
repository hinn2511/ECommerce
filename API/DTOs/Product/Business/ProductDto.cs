using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public ICollection<ProductColorDto> Colors { get; set; }
        public string Material { get; set; }
        public int Height { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Weight { get; set; }
        public string PhotoUrl { get; set; }
        public string Category { get; set; }
        public string Brand { get; set; }
        public string Collection { get; set; }
        public double Price { get; set; }
        public string Introduction { get; set; }
        public ICollection<ProductPhotoDto> ProductPhotos { get; set; }
    }
}