using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CartRepository : ICartRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public CartRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Cart> FindCustomerCartItemAsync(int customerId, int productId)
        {
            return await _context.Carts
                .FirstOrDefaultAsync(x => x.CustomerId == customerId
                 && x.ProductId == productId);
        }

        public async Task<PagedList<CartDto>> GetCustomerCartItems(PaginationParams paginationParams, int customerId)
        {
            var products = _context.Products.OrderBy(u => u.ProductName).AsQueryable();
            var carts = _context.Carts.AsQueryable();
            carts = carts.Where(carts => carts.CustomerId == customerId);
            products = carts.Select(carts => carts.Product);

            var cartLists = products.Select(product => new CartDto
            {
                ProductCode = product.ProductCode,
                ProductName = product.ProductName,
                Price = product.Price,
                PhotoUrl = product.ProductPhotos.FirstOrDefault(p => p.IsMain).Url,
                Quantity = product.Carts.FirstOrDefault(p => p.ProductId == product.Id && p.CustomerId == customerId).Quantity,
                ColorCode = product.Carts.FirstOrDefault(p => p.ProductId == product.Id && p.CustomerId == customerId).Color.ColorCode,
                ColorName = product.Carts.FirstOrDefault(p => p.ProductId == product.Id && p.CustomerId == customerId).Color.ColorName
            });

            return await PagedList<CartDto>.CreateAsync(cartLists,
                 paginationParams.PageNumber, paginationParams.PageSize);

        }

        public async Task<AppUser> GetCustomerWithCartItems(int customerId)
        {
            return await _context.Users.Include(x => x.Carts)
                .FirstOrDefaultAsync(x => x.Id == customerId);
        }

        public void AddCartItem(Cart cart)
        {
            _context.Carts.Add(cart);
        }

        public void RemoveCartItem(Cart cart)
        {
            _context.Carts.Remove(cart);
        }

        public void UpdateCartItem(Cart cart)
        {
            _context.Entry(cart).State = EntityState.Modified;
        }
    }
}