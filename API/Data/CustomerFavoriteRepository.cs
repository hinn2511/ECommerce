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
    public class CustomerFavoriteRepository : ICustomerFavoriteRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public CustomerFavoriteRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public async Task<CustomerFavorite> GetCustomerFavoriteProductAsync(int customerId, int productId)
        {
            return await _context.Favorites.FirstOrDefaultAsync(x => x.CustomerId == customerId && x.ProductId == productId);
        }

        public async Task<PagedList<FavoriteProductDto>> GetCustomerFavoriteProductsAsync(FavoriteParams favoriteParams)
        {
            var products = _context.Products.OrderBy(u => u.ProductName).AsQueryable();
            var favorites = _context.Favorites.AsQueryable();
            favorites = favorites.Where(favorites => favorites.CustomerId == favoriteParams.CustomerId);
            products = favorites.Select(favorites => favorites.Product);

            var  favoriteProducts = products.Select(product => new FavoriteProductDto
            {
                ProductCode = product.ProductCode,
                ProductName = product.ProductName,
                Price = product.Price,
                PhotoUrl = product.ProductPhotos.FirstOrDefault(p => p.IsMain).Url,
                Category = product.Category.CategoryName,
                SubCategory = product.SubCategory.SubCategoryName,
                Brand = product.Brand.BrandName,
                Id = product.Id
            });

            return await PagedList<FavoriteProductDto>.CreateAsync(favoriteProducts,
                 favoriteParams.PageNumber, favoriteParams.PageSize);

        }

        public async Task<AppUser> GetUserWithFavorites(int userId)
        {
            return await _context.Users.Include(x => x.FavoriteProducts)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}