using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        void Update(Product product);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<Product> GetProductByProductNameAsync(string productName);
        Task<IEnumerable<ProductDto>> GetAllProductsForCustomerAsync();
        Task<ProductDto> GetProductForCustomerAsync(string productName);
    }
}