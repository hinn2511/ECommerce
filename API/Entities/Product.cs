using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Product
    {
        
        public int Id { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public int SalePercent { get; set; }
        public string Material { get; set; }
        public int Height { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Weight { get; set; }
        public string Introduction { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public int BrandId { get; set; }
        public int CollectionId { get; set; }
        public int AreaId { get; set; }
        public Category Category { get; set; }
        public SubCategory SubCategory { get; set; }
        public Collection Collection { get; set; }
        public Brand Brand { get; set; }
        public Area Area { get; set; }
        public ICollection<OrderDetail> OrderDetail { get; set; }        
        public ICollection<ProductPhoto> ProductPhotos { get; set; }
        public ICollection<ProductColor> ProductColors { get; set; }
        public ICollection<CustomerFavorite> FavoriteByCustomers { get; set; }
        public ICollection<Cart> Carts { get; set; }
    }
}