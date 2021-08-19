using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        //Customer 
        Task<ProductToCustomerDto> GetProductCustomerAsync(string productCode,string productName);
        Task<IEnumerable<ProductToCustomerDto>> GetAllProductsCustomerAsync();
        Task<IEnumerable<ProductToCustomerDto>> GetProductsByCategoryCustomerAsync(string category);
        /////////////////////////////////////
        Task<Product> FindProductByCodeAsync(string productCode);
        void Add(Product product);
        void Update(Product product);
        Task<bool> SaveAllAsync();
        //Task<IEnumerable<Product>> GetProductsAsync();
        //Task<Product> GetProductByIdAsync(int id);
        //Task<Product> GetProductByProductNameAsync(string productName);
        //Task<ProductDto> GetProductForCustomerAsync(string productName);
    }
}