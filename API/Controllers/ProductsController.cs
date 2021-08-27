using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IProductPhotoService _productPhotoService;
        private readonly IUnitOfWork _unitOfWork;
        public ProductsController(IUnitOfWork unitOfWork, IMapper mapper, IProductPhotoService productPhotoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _productPhotoService = productPhotoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts([FromQuery] CustomerParams customerParams)
        {

            var products = await _unitOfWork.ProductRepository.GetAllProductsAsync(customerParams);

            Response.AddPaginationHeader(products.CurrentPage, products.PageSize, products.TotalCount, products.TotalPages);

            return Ok(products);

        }

        [HttpGet("{productCode}")]
        public async Task<ActionResult<ProductDto>> GetProduct(string productCode)
        {
            var productColors = await _unitOfWork.ProductRepository.GetProductAsync(productCode);
            if (productColors == null) return BadRequest("Không tìm thấy sản phẩm");
            return Ok(productColors);
        }

        [HttpGet("color/{productCode}")]
        public async Task<ActionResult<ProductColorDto>> GetProductColors(string productCode)
        {
            var productColors = await _unitOfWork.ProductRepository.GetProductColor(productCode);
            return Ok(productColors);
        }


        [Authorize(Policy = "BusinessOnly")]
        [HttpGet("business/{productCode}", Name = "GetProduct")]
        public async Task<ActionResult<ProductDto>> GetProductForBusiness(string productCode)
        {
            return await _unitOfWork.ProductRepository.GetProductAsync(productCode);
        }

        [Authorize(Policy = "PurchasingOnly")]
        [HttpPost("add-product-photo/{productCode}")]
        public async Task<ActionResult<ProductPhotoDto>> AddProductPhoto(IFormFile file, string productCode)
        {
            var product = await _unitOfWork.ProductRepository.FindProductByCodeAsync(productCode);

            var result = await _productPhotoService.AddProductPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var productPhoto = new ProductPhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (product.ProductPhotos.Count == 0)
            {
                productPhoto.IsMain = true;
            }

            product.ProductPhotos.Add(productPhoto);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetProduct", new { productCode = productCode }, _mapper.Map<ProductPhotoDto>(productPhoto));
            }

            return BadRequest("Đã có lỗi xảy ra khi thêm hình ảnh sản phẩm");
        }

        [Authorize(Policy = "PurchasingOnly")]
        [HttpPut("set-main-product-photo/{productCode}/{photoId}")]
        public async Task<ActionResult> SetMainProductPhoto(string productCode, int photoId)
        {
            var product = await _unitOfWork.ProductRepository.FindProductByCodeAsync(productCode);

            var productPhoto = product.ProductPhotos.FirstOrDefault(x => x.Id == photoId);

            if (productPhoto.IsMain) return BadRequest("Hình ảnh sản phẩm chọn đã là hình ảnh chính");

            var currentMain = product.ProductPhotos.FirstOrDefault(x => x.IsMain);

            if (currentMain != null) currentMain.IsMain = false;

            productPhoto.IsMain = true;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Đã có lỗi xảy ra khi chọn hình ảnh sản phẩm chính");
        }


        [Authorize(Policy = "PurchasingOnly")]
        [HttpDelete("delete-product-photo/{productCode}/{photoId}")]
        public async Task<ActionResult> DeleteProductPhoto(string productCode, int photoId)
        {
            var product = await _unitOfWork.ProductRepository.FindProductByCodeAsync(productCode);

            var productPhoto = product.ProductPhotos.FirstOrDefault(x => x.Id == photoId);

            if (productPhoto == null) return NotFound();

            if (productPhoto.IsMain) return BadRequest("Không thể xóa hình ảnh sản phẩm chính");

            if (productPhoto.PublicId != null)
            {
                var result = await _productPhotoService.DeleteProductPhotoAsync(productPhoto.PublicId);

                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            product.ProductPhotos.Remove(productPhoto);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Đã có lỗi xảy ra khi xóa hình ảnh sản phẩm");

        }





        // [HttpPut]
        // public async Task<ActionResult> UpdateProduct(ProductUpdateDto productUpdateDto)
        // {
        //     var product = await _unitOfWork.ProductRepository.GetProductByIdAsync(productUpdateDto.Id);

        //     if(product == null) return BadRequest("Product not found");

        //     _mapper.Map(productUpdateDto, product);

        //     _unitOfWork.ProductRepository.Update(product);

        //     if(await _unitOfWork.Complete()) return NoContent();

        //     return BadRequest("Failed to update product");
        // }

        // [HttpPost]
        // public async Task<ActionResult> AddProduct(ProductUpdateDto productUpdateDto)
        // {
        //     var productCreate = await _unitOfWork.ProductRepository.GetProductByProductNameAsync(productUpdateDto.ProductName);

        //     if( productCreate != null) return BadRequest("Product already exist");

        //     var newProduct = new Product
        //     {
        //         ProductName = productUpdateDto.ProductName,
        //         Price = productUpdateDto.Price,
        //         BrandId = productUpdateDto.BrandId,
        //         Introduction = productUpdateDto.Introduction,
        //         CategoryId = productUpdateDto.CategoryId,
        //         CollectionId = productUpdateDto.CollectionId,
        //         Created = DateTime.UtcNow
        //     };

        //     _unitOfWork.ProductRepository.Add(newProduct);

        //     if(await _unitOfWork.Complete()) return NoContent();

        //     return BadRequest("Failed to add product");

        // }
    }
}