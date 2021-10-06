using System.Threading.Tasks;
using API.DTOs.Product;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public CartController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [Authorize(Policy = "CustomerOnly")]
        [HttpPost("add")]
        public async Task<ActionResult> AddToCart(CartItemDto cartItemDto)
        {
            if (cartItemDto.Quantity <= 0)
                return BadRequest("Số lượng không hợp lệ");

            var customerId = User.GetUserId();

            var product = await _unitOfWork.ProductRepository.FindProductByCodeAsync(cartItemDto.ProductCode);

            if (product == null) return BadRequest("Không tìm thấy sản phẩm");

            var cartItem = await _unitOfWork.CartRepository.FindCustomerCartItemAsync(customerId, product.Id);

            if (cartItemDto.ColorCode != null)
            {
                var color = await _unitOfWork.ColorRepository.FindColorByCodeAsyc(cartItemDto.ColorCode);

                if (cartItem == null)
                {
                    var newCartItem = new Cart
                    {
                        ProductId = product.Id,
                        CustomerId = customerId,
                        Quantity = cartItemDto.Quantity,
                        ColorId = color.Id
                    };
                    _unitOfWork.CartRepository.AddCartItem(newCartItem);
                    if (await _unitOfWork.Complete()) return Ok();
                }

            }
            else
            {
                var newCartItemDefault = new Cart
                {
                    ProductId = product.Id,
                    CustomerId = customerId,
                    Quantity = cartItemDto.Quantity
                };
                _unitOfWork.CartRepository.AddCartItem(newCartItemDefault);

                if (await _unitOfWork.Complete()) return Ok();
            }

            return BadRequest("Đã có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng");
        }

        [Authorize(Policy = "CustomerOnly")]
        [HttpPut("adjust")]
        public async Task<ActionResult> AdjustCartItem(CartItemDto cartItemDto)
        {
            if (cartItemDto.Quantity <= 0)
                return BadRequest("Số lượng không hợp lệ");


            var customerId = User.GetUserId();

            var product = await _unitOfWork.ProductRepository.FindProductByCodeAsync(cartItemDto.ProductCode);

            var color = await _unitOfWork.ColorRepository.FindColorByCodeAsyc(cartItemDto.ColorCode);

            var cartItem = await _unitOfWork.CartRepository.FindCustomerCartItemAsync(customerId, product.Id);

            if (cartItem == null)
                return BadRequest("Sản phẩm không tồn tại trong giỏ hàng");

            if (color != null)
                cartItem.ColorId = color.Id;

            cartItem.Quantity = cartItemDto.Quantity;

            _unitOfWork.CartRepository.UpdateCartItem(cartItem);
            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Đã có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng");
        }

        [Authorize(Policy = "CustomerOnly")]
        [HttpDelete("remove/{productCode}")]
        public async Task<ActionResult> RemoveFromCart(string productCode)
        {
            var customerId = User.GetUserId();

            var product = await _unitOfWork.ProductRepository.FindProductByCodeAsync(productCode);

            if (product == null) return BadRequest("Không tìm thấy sản phẩm");

            var cartItem = await _unitOfWork.CartRepository.FindCustomerCartItemAsync(customerId, product.Id);

            if (cartItem == null)
                return BadRequest("Không tìm thấy sản phẩm trong giỏ hàng");

            _unitOfWork.CartRepository.RemoveCartItem(cartItem);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Đã có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng");
        }

        [Authorize(Policy = "CustomerOnly")]
        [HttpGet]
        public async Task<ActionResult> GetCustomerCart([FromQuery] PaginationParams paginationParams)
        {
            var customerId = User.GetUserId();
            var users = await _unitOfWork.CartRepository.GetCustomerCartItems(paginationParams, customerId);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize,
                users.TotalCount, users.TotalPages);
            return Ok(users);
        }


    }
}