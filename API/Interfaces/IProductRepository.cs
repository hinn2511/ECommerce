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
        Task<ProductToCustomerDto> GetProductCustomerAsync(string productCode);
        Task<PagedList<ProductToCustomerDto>> GetAllProductsCustomerAsync(UserParams userParams);

        //Business
        Task<Product> FindProductByCodeAsync(string productCode);
        Task<ProductDto> GetProductAsync(string productCode);

        //CRUD
        void Add(Product product);
        void Update(Product product);
        void Delete(Product product);
    }
}