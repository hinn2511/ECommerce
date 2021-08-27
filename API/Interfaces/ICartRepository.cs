using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ICartRepository
    {
        Task<Cart> FindCustomerCartItemAsync(int customerId, int productId);
        Task<AppUser> GetCustomerWithCartItems(int customerId);
        Task<PagedList<CartDto>> GetCustomerCartItems(PaginationParams paginationParams, int customerId);
        void AddCartItem(Cart cart);
        void RemoveCartItem(Cart cart);
        void UpdateCartItem(Cart cart);
    }
}