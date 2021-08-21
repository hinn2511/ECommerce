using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
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


        public async Task<PagedList<ProductToCustomerDto>> GetAllProductsCustomerAsync(UserParams userParams)
        {
            var query =  _context.Products.AsQueryable();

            var minPrice = 0.0;
            var maxPrice = 1000000000.0;
            if (userParams.MinPrice > 0.0) 
                minPrice = userParams.MinPrice;
            if (userParams.MaxPrice > 0.0) 
                maxPrice = userParams.MaxPrice;
            query = query.Where(p => p.Category.CategoryName == userParams.Category);
            query = query.Where(p => p.Price >= minPrice && p.Price <= maxPrice); 

            query = userParams.OrderBy switch
            {
                "newest" => query.OrderByDescending(u => u.Created),
                "oldest" => query.OrderBy(u => u.Created),
                "highestPrice" => query.OrderByDescending(u => u.Price),
                "lowestPrice" => query.OrderBy(u => u.Price),
                _ => query.OrderByDescending(u => u.Created)
            };

            return await PagedList<ProductToCustomerDto>
                .CreateAsync(query.ProjectTo<ProductToCustomerDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                    userParams.PageNumber, userParams.PageSize);

        }

        public async Task<ProductToCustomerDto> GetProductCustomerAsync(string productCode, string productName)
        {
            return await _context.Products
             .Where(p => p.ProductName == productName && p.ProductCode == productCode)
             .ProjectTo<ProductToCustomerDto>(_mapper.ConfigurationProvider)
             .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<ProductToCustomerDto>> GetProductsByCategoryCustomerAsync(string category)
        {
            var productCategory = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryName == category);
            if (productCategory != null)
                return await _context.Products
                    .Where(p => p.CategoryId == productCategory.Id)
                    .ProjectTo<ProductToCustomerDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
            return null;
        }

        public async Task<Product> FindProductByCodeAsync(string productCode)
        {
            return await _context.Products
                .Include(x => x.ProductPhotos)
                .FirstAsync(x => x.ProductCode == productCode);
        }

        public async Task<ProductDto> GetProductAsync(string productCode)
        {
            return await _context.Products
             .Where(p => p.ProductCode == productCode)
             .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
             .SingleOrDefaultAsync();
        }

        public void Add(Product product)
        {
            _context.Products.Add(product);
        }
        public void Update(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }






        // public async Task<Product> GetProductByIdAsync(int id)
        // {
        //     return await _context.Products.FindAsync(id);
        // }

        // public async Task<Product> GetProductByProductNameAsync(string productName)
        // {
        //     return await _context.Products
        //         .Include(p => p.ProductPhotos)
        //         .SingleOrDefaultAsync(p => p.ProductName == productName);
        // }


        // public async Task<ProductDto> GetProductForCustomerAsync(string productName)
        // {
        //     return await _context.Products
        //      .Where(p => p.ProductName == productName)
        //      .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
        //      .SingleOrDefaultAsync();
        // }

        // public async Task<IEnumerable<Product>> GetProductsAsync()
        // {
        //     return await _context.Products
        //         .Include(p => p.ProductPhotos)
        //         .ToListAsync();
        // }

    }
}