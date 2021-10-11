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
        Task<PagedList<ProductDto>> GetAllProductsAsync(ProductParams productParams);
        Task<PagedList<ProductDto>> GetProductsByNameAsync(SearchProductParams searchProductParams);
        Task<IEnumerable<ProductColorDto>> GetProductColor(string productCode);
        Task<ProductColor> GetDefaultProductColorAsync(int productId);

        //Business
        Task<Product> FindProductByCodeAsync(string productCode);
        Task<Product> GetProductByCodeAsync(string productCode);
        Task<Product> FindProductByIdAsync(int id);

        //CRUD
        void Add(Product product);
        void Update(Product product);
        void Delete(Product product);
    }
}