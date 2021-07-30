using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProductRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsForCustomerAsync()
        {
            return await _context.Products
             .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
             .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<Product> GetProductByProductNameAsync(string productName)
        {
            return await _context.Products
                .Include(p => p.ProductPhotos)
                .SingleOrDefaultAsync(p => p.ProductName == productName);
        }

        public async Task<ProductDto> GetProductForCustomerAsync(string productName)
        {
            return await _context.Products
             .Where(p => p.ProductName == productName)
             .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
             .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _context.Products
                .Include(p => p.ProductPhotos)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }
    }
}