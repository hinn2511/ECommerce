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
    public class FavoriteRepository : IFavoriteRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public FavoriteRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public async Task<CustomerFavorite> FindCustomerFavoriteProductAsync(int customerId, int productId)
        {
            return await _context.Favorites.FirstOrDefaultAsync(x => x.CustomerId == customerId && x.ProductId == productId);
        }

        public async Task<PagedList<FavoriteProductDto>> GetCustomerFavoriteProductsAsync(PaginationParams paginationParams, int customerId)
        {
            var products = _context.Products.OrderBy(u => u.ProductName).AsQueryable();
            var favorites = _context.Favorites.AsQueryable();
            favorites = favorites.Where(favorites => favorites.CustomerId == customerId);
            products = favorites.Select(favorites => favorites.Product);

            var favoriteProducts = products.Select(product => new FavoriteProductDto
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
                 paginationParams.PageNumber, paginationParams.PageSize);

        }

        public async Task<AppUser> GetCustomerWithFavoritesAsync(int customerId)
        {
            return await _context.Users.Include(x => x.FavoriteProducts)
                .FirstOrDefaultAsync(x => x.Id == customerId);
        }
    }
}