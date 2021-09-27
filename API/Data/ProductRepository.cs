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


        public async Task<PagedList<ProductDto>> GetAllProductsAsync(ProductParams productParams)
        {
            var query = _context.Products.AsQueryable();
            
            var minPrice = 0.0;
            var maxPrice = 1000000000.0;
            if (productParams.MinPrice > 0.0)
                minPrice = productParams.MinPrice;
            if (productParams.MaxPrice > 0.0)
                maxPrice = productParams.MaxPrice;
            query = query.Where(p => p.SubCategory.SubCategoryName == productParams.Categories
             || p.Category.CategoryName == productParams.Categories);
            query = query.Where(p => p.Price >= minPrice && p.Price <= maxPrice);

            query = productParams.OrderBy switch
            {
                "newest" => query.OrderByDescending(u => u.Created),
                "oldest" => query.OrderBy(u => u.Created),
                "highestPrice" => query.OrderByDescending(u => u.Price),
                "lowestPrice" => query.OrderBy(u => u.Price),
                _ => query.OrderByDescending(u => u.Created)
            };

            return await PagedList<ProductDto>
                .CreateAsync(query.ProjectTo<ProductDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                    productParams.PageNumber, productParams.PageSize);

        }

        public async Task<ProductDto> GetProductAsync(string productCode)
        {
            return await _context.Products
             .Where(p => p.ProductCode == productCode)
             .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
             .SingleOrDefaultAsync();
        }


        public async Task<Product> FindProductByCodeAsync(string productCode)
        {
            return await _context.Products
                .Include(x => x.ProductPhotos)
                .FirstOrDefaultAsync(x => x.ProductCode == productCode);
        }

        public async Task<Product> GetProductByCodeAsync(string productCode)
        {
            return await _context.Products
                .Include(x => x.ProductPhotos)
                .SingleOrDefaultAsync(x => x.ProductCode == productCode);
        }

        public async Task<Product> FindProductByIdAsync(int id)
        {
            return await _context.Products
                .FirstOrDefaultAsync(x => x.Id == id);
        }



        public void Add(Product product)
        {
            _context.Products.Add(product);
        }
        public void Update(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }


        public void Delete(Product product)
        {
            _context.Products.Remove(product);
        }

        public async Task<IEnumerable<ProductColorDto>> GetProductColor(string productCode)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.ProductCode == productCode);
            if (product != null) 
            {
                return await _context.ProductColors
                .Where(p => p.ProductId == product.Id)
                .Select(pc => new ProductColorDto
                {
                    Quantity = pc.Quantity,
                    ColorCode = pc.Color.ColorCode,
                    HexCode = pc.Color.HexCode,
                    ColorName = pc.Color.ColorName
                }).ToListAsync();
            }
            return null;
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