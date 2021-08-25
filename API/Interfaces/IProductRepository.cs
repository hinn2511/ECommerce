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
        Task<ProductDto> GetProductAsync(string productCode);
        Task<PagedList<ProductDto>> GetAllProductsAsync(UserParams userParams);
        Task<IEnumerable<ProductColorDto>> GetProductColor(string productCode);

        //Business
        Task<Product> FindProductByCodeAsync(string productCode);
        Task<Product> GetProductByCodeAsync(string productCode);

        //CRUD
        void Add(Product product);
        void Update(Product product);
        void Delete(Product product);
    }
}