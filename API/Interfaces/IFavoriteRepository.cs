using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IFavoriteRepository
    {
        Task<CustomerFavorite> FindCustomerFavoriteProductAsync(int customerId, int productId);
        Task<AppUser> GetCustomerWithFavoritesAsync(int customerId);
        Task<PagedList<FavoriteProductDto>> GetCustomerFavoriteProductsAsync(PaginationParams paginationParams, int customerId);
    }
}