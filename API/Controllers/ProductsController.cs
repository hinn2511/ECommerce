using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IProductPhotoService _productPhotoService;
        public ProductsController(IProductRepository productRepository, IMapper mapper, IProductPhotoService productPhotoService)
        {
            _productPhotoService = productPhotoService;
            _mapper = mapper;
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductToCustomerDto>>> GetProducts()
        {
            var products = await _productRepository.GetAllProductsCustomerAsync();

            return Ok(products);

        }

        [HttpGet("{productCode}/{productName}")]
        public async Task<ActionResult<ProductToCustomerDto>> GetProduct(string productCode, string productName)
        {
            return await _productRepository.GetProductCustomerAsync(productCode, productName);
        }

        [HttpGet("category/{categoryName}")]
        public async Task<ActionResult<IEnumerable<ProductToCustomerDto>>> GetProductsByCategory(string categoryName)
        {
            var products = await _productRepository.GetProductsByCategoryCustomerAsync(categoryName.ToLower());
            return Ok(products);
        }


        [Authorize]
        [HttpPost("add-product-photo/{productCode}")]
        public async Task<ActionResult<ProductPhotoDto>> AddProductPhoto(IFormFile file, string productCode)
        {
            var product = await _productRepository.FindProductByCodeAsync(productCode);

            var result = await _productPhotoService.AddProductPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var productPhoto = new ProductPhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if(product.ProductPhotos.Count == 0)
            {
                productPhoto.IsMain = true;
            }

            product.ProductPhotos.Add(productPhoto);

            if (await _productRepository.SaveAllAsync())
                return _mapper.Map<ProductPhotoDto>(productPhoto);

            return BadRequest("Adding product photo error");
        }

        // [HttpPut]
        // public async Task<ActionResult> UpdateProduct(ProductUpdateDto productUpdateDto)
        // {
        //     var product = await _productRepository.GetProductByIdAsync(productUpdateDto.Id);

        //     if(product == null) return BadRequest("Product not found");

        //     _mapper.Map(productUpdateDto, product);

        //     _productRepository.Update(product);

        //     if(await _productRepository.SaveAllAsync()) return NoContent();

        //     return BadRequest("Failed to update product");
        // }

        // [HttpPost]
        // public async Task<ActionResult> AddProduct(ProductUpdateDto productUpdateDto)
        // {
        //     var productCreate = await _productRepository.GetProductByProductNameAsync(productUpdateDto.ProductName);

        //     if( productCreate != null) return BadRequest("Product already exist");

        //     var newProduct = new Product
        //     {
        //         ProductName = productUpdateDto.ProductName,
        //         Price = productUpdateDto.Price,
        //         BrandId = productUpdateDto.BrandId,
        //         Introduction = productUpdateDto.Introduction,
        //         CategoryId = productUpdateDto.CategoryId,
        //         CollectionId = productUpdateDto.CollectionId,
        //         Created = DateTime.Now
        //     };

        //     _productRepository.Add(newProduct);

        //     if(await _productRepository.SaveAllAsync()) return NoContent();

        //     return BadRequest("Failed to add product");

        // }
    }
}