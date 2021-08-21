using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        //Customer 
        Task<ProductToCustomerDto> GetProductCustomerAsync(string productCode,string productName);
        Task<PagedList<ProductToCustomerDto>> GetAllProductsCustomerAsync(UserParams userParams);
        Task<IEnumerable<ProductToCustomerDto>> GetProductsByCategoryCustomerAsync(string category);
        /////////////////////////////////////
        Task<Product> FindProductByCodeAsync(string productCode);
        Task<ProductDto> GetProductAsync(string productCode);
        void Add(Product product);
        void Update(Product product);
        Task<bool> SaveAllAsync();
        //Task<IEnumerable<Product>> GetProductsAsync();
        //Task<Product> GetProductByIdAsync(int id);
        //Task<Product> GetProductByProductNameAsync(string productName);
        //Task<ProductDto> GetProductForCustomerAsync(string productName);
    }
}