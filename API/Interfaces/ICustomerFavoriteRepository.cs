using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ICustomerFavoriteRepository
    {
        Task<CustomerFavorite> GetCustomerFavoriteProductAsync(int customerId, int productId);
        Task<AppUser> GetUserWithFavorites(int customerId);
        Task<PagedList<FavoriteProductDto>> GetCustomerFavoriteProductsAsync(FavoriteParams favoriteParams);
    }
}