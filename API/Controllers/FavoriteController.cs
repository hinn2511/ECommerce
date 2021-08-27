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

    public class FavoriteController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public FavoriteController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [Authorize (Policy = "CustomerOnly")]
        [HttpPost("add-to-favorite/{productCode}")]
        public async Task<ActionResult> AddLike(string productCode)
        {
            var customerId = User.GetUserId();

            var favoritedProduct = await _unitOfWork.ProductRepository.FindProductByCodeAsync(productCode);
            if (favoritedProduct == null) return NotFound();
            
            var customerFavorite = await _unitOfWork.FavoriteRepository.FindCustomerFavoriteProductAsync(customerId, favoritedProduct.Id);
            if (customerFavorite != null) return BadRequest("Sản phẩm đã được yêu thích");

            customerFavorite = new CustomerFavorite
            {
                CustomerId = customerId,
                ProductId = favoritedProduct.Id
            };

            var customer = await _unitOfWork.FavoriteRepository.GetCustomerWithFavoritesAsync(customerId);
            customer.FavoriteProducts.Add(customerFavorite);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Thêm sản phẩm vào yêu thích không thành công");
        }


        [Authorize (Policy = "CustomerOnly")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavoriteProductDto>>> GetUserLikes([FromQuery] PaginationParams paginationParams)
        {
            var customerId = User.GetUserId();
            var users = await _unitOfWork.FavoriteRepository.GetCustomerFavoriteProductsAsync(paginationParams, customerId);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize,
                users.TotalCount, users.TotalPages);
            return Ok(users);
        }
    }

}